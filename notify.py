import logging
import traceback
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from config import mail_info

class Emailer:

    smtp_server = mail_info["smtp_server"]
    username = mail_info["username"]
    password = mail_info["password"]
    receiver = mail_info['receiver']
    smtp = None

    @classmethod
    def _smtp_connect(cls):
        """smtp服务器连接测试
        """
        cls.smtp = smtplib.SMTP_SSL(cls.smtp_server, 465)
        cls.smtp.login(cls.username, cls.password)
        logging.info("smtp服务器连接成功")

    @classmethod
    def _send_email(cls, content:str):
        # 发送邮件 SMTP
        msg = MIMEMultipart()
        msg['From'] = cls.username                # 发件人
        msg['To'] = cls.receiver                       # 收件人
        msg['Subject'] = mail_info['fail_subject']
        mail_body = MIMEText(content,_charset='utf-8')
        msg.attach(mail_body)                # 把正文加到邮件体里面去
        cls.smtp.sendmail(cls.username, cls.receiver, msg.as_string())
        logging.info("提醒邮件发送成功!")

    @classmethod
    def send_email(cls,content:str):
        try:
            cls._smtp_connect()
            cls._send_email(content)
        except Exception as e:
            logging.error("邮件发送失败!")
            logging.error(traceback.format_exc())
        finally:
            cls.dispose()

    @classmethod
    def dispose(cls):
        """断开与smtp服务器的连接
        """
        if cls.smtp:
            cls.smtp.quit()



if __name__ == '__main__':
    msg = "你好,生活"
    Emailer.send_email(msg)
    
