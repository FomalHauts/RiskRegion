import requests
import time
from hashlib import sha256
import logging
import datetime
import traceback

from requests.api import head


class RiskSpider:

    url = "http://103.66.32.242:8005/zwfwMovePortal/interface/interfaceJson"
    sign_key = "23y0ufFl5YxIyGrI8hWRUZmKkvtSjLQA"
    wif_key = "fTN2pfuisxTavbTuYVSsNJHetwq5bJvCQkjjtiLM2dCratiA"
    nonceHeader = "123456789abcdefg"
    paasHeader = "zdww"

    @classmethod
    def encrypt(cls, content: str) -> str:
        """sha256加密
        """
        content = content.encode("utf-8")
        sha256_str = sha256(content).hexdigest().upper()
        return sha256_str


    @classmethod
    def getPayload(cls,time_str:str) -> dict:
        """获取请求参数和headers
        放在一个函数里主要是使用相同的时间戳
        """
        headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36 Edg/97.0.1072.55",
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "x-wif-nonce": "QkjjtiLM2dCratiA",
            "x-wif-paasid": "smt-application",
            "x-wif-signature": cls.encrypt(time_str + cls.wif_key + time_str),
            "x-wif-timestamp": time_str,
            "Content-Type": "application/json; charset=utf-8"
        }
        logging.info("!")

        data = {
            "appId": "NcApplication",
            "paasHeader": cls.paasHeader,
            "timestampHeader": time_str,
            "nonceHeader": cls.nonceHeader,
            "signatureHeader": cls.encrypt(time_str + cls.sign_key + cls.nonceHeader + time_str),
            "key": "3C502C97ABDA40D0A60FBEE50FAAD1DA"
        }
        logging.info("header、payload获取成功!")
        return headers,data

    @classmethod
    def get_now_time(cls) -> str:
        """获取当前时间
        获取0时区时间,变换为东八区时间,因为运行程序的服务器所处时区不确定
        """
        now = datetime.datetime.utcnow()
        now = now + datetime.timedelta(hours=8)
        now = str(now.timestamp())[:10] # 时间戳：10位,秒
        return now

    @classmethod
    def getRiskRegion(cls) -> dict:
        """获取疫情风险地区数据
        """
        try:
            time_str = cls.get_now_time()
            headers,data = cls.getPayload(time_str)
            response = requests.post(
                cls.url, headers=headers, json=data, verify=False)
            res = response.json()
            risk_region = res['data']
            print(f"status_code:{res['code']},msg:{res['msg']}")
            if risk_region:
                logging.info("获取全国疫情中高风险地区成功!")
                return risk_region
            else:
                raise ValueError("数据为空")
        except:
            logging.error("获取全国疫情中高风险地区失败,报错信息如下:")
            logging.error(traceback.format_exc())


if __name__ == "__main__":
    RiskSpider.getRiskRegion()
    
