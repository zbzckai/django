# -*- coding: utf-8 -*-
# @Time    : 2019\2\20 0020 9:34
# @Author  : 凯
# @File    : urls.py
from django.conf.urls import url
from . import views
app_name='axf'
urlpatterns = [
    url(r'home/$', views.home, name='home'),
    url(r'^market/$', views.market, name='market'),
    url(r'^cart/$', views.cart, name='cart'),
    url(r'^mine/$', views.mine, name='mine'),
]
