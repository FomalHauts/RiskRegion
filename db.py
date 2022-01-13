import pymongo
import logging
import sys
import os
from config import db_info

class MongoDB:
    def __init__(self, host, db_name, username, password, port=27017,authSource="admin",authMechanism='SCRAM-SHA-256'):
        self.connection = pymongo.MongoClient(host=host, port=port,
                                            username=username,password=password,
                                            authSource=authSource,authMechanism=authMechanism)
        self.db = self.connection[db_name]
        print(self.db)

    def get_collection_names(self):
        return self.db.list_collection_names()

    def insert_one(self, collection_name, value):
        """单个插入
        """
        database = self.db[collection_name]
        data_id = database.insert_one(value)
        return data_id.inserted_id

    def insert_many(self, collection_name, value_list):
        """批量插入
        """
        database = self.db[collection_name]
        data_id = database.insert_many(value_list)
        return data_id.inserted_ids

    def find_one(self, collection_name, search_col=None):
        """查询单个数据
        """
        col = self.db[collection_name]
        try:
            result = col.find_one(search_col)
            return result
        except TypeError as e:
            logging.error(e)
            return None

    def find(self, collection_name, search_col=None, limit_num=sys.maxsize, sort_col='None_sort', sort='asc'):
        """查询所有数据
        """
        col = self.db[collection_name]
        try:
            if sort_col == False or sort_col == 'None_sort':
                results = col.find(search_col).limit(limit_num)
            else:
                sort_flag = 1
                if sort == 'desc':
                    sort_flag = -1
                results = col.find(search_col).sort(
                    sort_col, sort_flag).limit(limit_num)
            result_all = [i for i in results]
            return result_all
        except TypeError as e:
            logging.error(e)
            return None

    def update_one(self, collection_name, search_col, update_col):
        """单个更新
        """
        col = self.db[collection_name]
        try:
            return col.update_one(search_col, update_col)
        except TypeError as e:
            logging.error(e)
            return None

    def update_many(self, collection_name, search_col, update_col):
        """批量更新
        """
        col = self.db[collection_name]
        try:
            return col.update_many(search_col, update_col)
        except TypeError as e:
            logging.error(e)
            return None

    def delete_one(self, collection_name, search_col):
        """单个删除
        """
        col = self.db[collection_name]
        try:
            return col.delete_one(search_col)
        except TypeError as e:
            logging.error(e)
            return None

    def delete_many(self, collection_name, search_col):
        """批量删除
        """
        col = self.db[collection_name]
        try:
            return col.delete_many(search_col)
        except TypeError as e:
            logging.error(e)
            return None

    def drop_collection(self, collection_name):
        """
        删除集合，如果删除成功 drop() 返回 true，如果删除失败(集合不存在)则返回 false
        """
        col = self.db[collection_name]
        result = col.drop()
        return result

    def dispose(self):
        """断开mongodb连接
        """
        if self.connection:
            self.connection.close()
            return True


if __name__ == '__main__':
    mongoDB = MongoDB(host=db_info["host"],db_name=db_info["db"],
                     username=db_info["username"],password=db_info["password"],
                    port=db_info["port"],authSource=db_info['authSource']
                    )
    mongoDB.insert_one(db_info["collection"],{"title":"全国疫情中高风险地区统计"})
    mongoDB.dispose()