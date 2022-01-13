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