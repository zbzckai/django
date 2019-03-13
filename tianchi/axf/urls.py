# -*- coding: utf-8 -*-
# @Time    : 2019\2\20 0020 9:34
# @Author  : 凯
# @File    : urls.py
from django.conf.urls import url
from . import views
app_name='axf'
urlpatterns = [
    url(r'^index/$', views.index, name='market'),
    url(r'^add/$', views.add, name='home'),
    url(r'^home/$', views.home, name='home'),
    url(r'^index/select_stu/$',views.select_stu,name = 'select_stu'),
    url(r'^index/regist/$', views.regist, name='regist'),

]
