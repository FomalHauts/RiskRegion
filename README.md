# 

![apscheduler: 3.8.1 (shields.io)](https://img.shields.io/badge/apscheduler-3.8.1-brightgreen)     ![pymongo: 4.0.1 (shields.io)](https://img.shields.io/badge/pymongo-4.0.1-yellow)      ![requests: 3.8.1 (shields.io)](https://img.shields.io/badge/requests-3.8.1-red)

# 代码结构

```
├── .gitignore     
├── config.py     # 配置文件
├── db.py		  # mongodb连接
├── main.py		  # 主程序
├── notify.py	  # 邮件
├── requirements.txt	
├── risk.js		 # 加密js
├── risk.py		# 疫情数据获取
├── risk_region.json  # 示例数据
└── risk_region.log	  # 日志文件
└── README.md	  
1 directory, 11 files
```

# 配置

修改config.py中的配置

```
mail_info = {
    "smtp_server": "smtp.exmail.qq.com",	# smtp服务器地址
    "username": "XXXX@qq.com",				# 邮箱账号
    "password": "xefRz5sWVksdYfoh",         # 授权码
    "receiver": "XXXX@qq.com",      		# 收件人
    "fail_subject": "疫情风险地区爬取失败提醒"  # 失败邮件主题
}

db_info = {
    "host": "localhost",					
    "port": 27017,
    "db": "risk",						# 数据库名
    "username": "risk_usr",					# 用户名
    "password": "risk_pwd",				# 密码
    "authSource": "risk", 				# 认证使用的数据库,和上面db相同
    "collection": "risk_region"				# 集合名
}

```



# 使用

```
1、git clone https://github.com/FomalHauts/RiskRegion.git
2、cd RiskRegion
3、pip install -r requirements.txt
4、修改config.py中的配置
5、修改main.py中apscheduler中add_job里start_date
5、python main.py
```

# 说明

1、通过risk.js分析获取疫情数据时的加密参数

2、对爬取到的数据生成消息摘要，保存数据时:

- 若数据库中无当日数据,直接插入

-  若数据库中已存在当日数据,则比对当前数据与库中数据的消息摘要, 若不一致,则更新数据

3、每隔1分钟爬取一次数据

4、程序出错后，发送报错邮件

















