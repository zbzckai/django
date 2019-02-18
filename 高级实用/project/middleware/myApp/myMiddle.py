# -*- coding: utf-8 -*-
# @Time    : 2019\2\18 0018 14:42
# @Author  : 凯
# @File    : myMiddle.py
from django.utils.deprecation import MiddlewareMixin
class myMiddle(MiddlewareMixin):
    def process_request(self,request):
        print('GET 参数为：',request.GET.get("a"))