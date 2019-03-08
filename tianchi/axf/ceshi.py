# -*- coding: utf-8 -*-
# @Time    : 2019\3\5 0005 8:49
# @Author  : 凯
# @File    : ceshi.py
aa= '{"model": "axf.wheel", "pk": 1, "fields": {"img": "http://img01.bqstatic.com//upload/activity/2017031716035274.jpg@90Q.jpg", "name": "\u9178\u5976\u5973\u738b", "trackid": "21870"}}, {"model": "axf.wheel", "pk": 2, "fields": {"img": "http://img01.bqstatic.com//upload/activity/2017031710450787.jpg@90Q.jpg", "name": "\u4f18\u9009\u5723\u5973\u679c", "trackid": "21869"}}, {"model": "axf.wheel", "pk": 3, "fields": {"img": "http://img01.bqstatic.com//upload/activity/2017030714522982.jpg@90Q.jpg", "name": "\u4f0a\u5229\u9178\u5976\u5927\u653e\u4ef7", "trackid": "21862"}}, {"model": "axf.wheel", "pk": 4, "fields": {"img": "http://img01.bqstatic.com//upload/activity/2017032116081698.jpg@90Q.jpg", "name": "\u9c9c\u8d27\u76f4\u4f9b\uff0d\u7a9d\u592b\u5c0f\u5b50", "trackid": "21770"}}'
print(type(aa))
import  json
dict(aa)
json.dumps(aa)
aa[1:-1]
data = json.dumps(aa)
data
bb = {"username":"jack","usersn":"123456"}
print(type(aa[1:-1]))