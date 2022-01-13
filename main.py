#!/usr/bin/env python
import json
import os
import traceback
import logging
from datetime import datetime
from hashlib import sha256
from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.events import EVENT_JOB_EXECUTED, EVENT_JOB_ERROR

from db import MongoDB
from config import db_info
from notify import Emailer
from risk import RiskSpider


# 配置日志显示
cur_path = os.path.dirname(os.path.abspath(__file__))
logging.basicConfig(level=logging.INFO,
                 format='%(asctime)s %(filename)s[line:%(lineno)d] %(levelname)s %(message)s',
                 datefmt='%Y-%m-%d %H:%M:%S',
                filename=os.path.join(cur_path,"risk_region.log"),
                filemode='a')

class Launcher:
    def __init__(self) -> None:
        self.mongoDB = None

    def DBConnect(self):
        self.mongoDB = MongoDB(host=db_info["host"], db_name=db_info["db"],
                               username=db_info["username"], password=db_info["password"],
                               port=db_info["port"], authSource=db_info['authSource']
                               )

    def RiskDataProcess(self, raw_data: dict) -> dict:
        """数据处理
        """
        risk_time = raw_data["end_update_time"].split(" ")
        update_date, update_hour = risk_time[0], risk_time[1][:-1]
        region = {
            # 去除不必要的键值对
            "highlist": self.dictPop(raw_data["highlist"], key="type"),
            "middlelist": self.dictPop(raw_data["middlelist"], key="type")
        }
        risk_data = {
            "date": datetime.now().strftime('%Y-%m-%d'),
            "update_date": update_date,
            "update_hour": update_hour,
            "hcount": raw_data["hcount"],
            "mcount": raw_data["mcount"],
            "region": region
        }
        return risk_data


    def saveData(self,risk_data:dict):
        """保存疫情风险地区数据
        若数据库中无当日数据,直接插入
        若数据库中已存在当日数据,则比对当当前数据与库中数据的消息摘要:
            若不一致，则更新数据
        """
        region_digest = self.msg_digest(json.dumps(risk_data["region"]))
        risk_data.update({"digest":region_digest})
        date = {"date":datetime.now().strftime('%Y-%m-%d')}
        exist_data = self.mongoDB.find_one(db_info["collection"],date)
        if not exist_data:
            risk_data.update({"op_time":datetime.now().strftime('%Y-%m-%d %H:%M:%S')})
            self.mongoDB.insert_one(db_info["collection"],risk_data)
            logging.info(f"插入【{date['date']}】疫情中高风险地区数据")
        elif region_digest != exist_data["digest"]:
            risk_data.update({"op_time":datetime.now().strftime('%Y-%m-%d %H:%M:%S')})
            self.mongoDB.update_one(db_info["collection"],date,{"$set":risk_data})
            logging.info(f"更新【{date['date']}】疫情中高风险地区数据")
        else:
            logging.info("爬取数据与数据库中数据相同,skip")

    @staticmethod
    def msg_digest(content: str) -> str:
        """生成消息摘要
        """
        content = content.encode("utf-8")
        sha256_str = sha256(content).hexdigest()
        return sha256_str

    @staticmethod
    def dictPop(content: list, key: str) -> list:
        """删除字典中不必要的键值对
        """
        for item in content:
            item.pop(key)
        return content


    def main(self):
        """主程序
        """
        try:
            raw_data = RiskSpider.getRiskRegion()
            self.DBConnect()
            risk_region = self.RiskDataProcess(raw_data)
            self.saveData(risk_region)
        except:
            logging.error(traceback.format_exc())
            Emailer.send_email(f"""
                                疫情风险地区爬取失败,具体信息如下:
                               {traceback.format_exc()}
                               """)
        finally:
            self.mongoDB.dispose()
            logging.info("与mongodb成功断开连接")

def crontab_listener(event):
    if event.exception:
        logging.error('Job launch failed!')
    else:
        logging.info("Job launch successfully!")

if __name__ == '__main__':
    scheduler = BlockingScheduler()
    launcher = Launcher()
    scheduler.add_job(func=launcher.main, trigger='interval', minutes=1,start_date="2022-01-13 11:00:00") # 每分钟执行一次
    # 配置任务执行完成和执行错误的监听
    scheduler.add_listener(crontab_listener, EVENT_JOB_EXECUTED | EVENT_JOB_ERROR)
    # 设置日志
    scheduler._logger = logging
    scheduler.start()
