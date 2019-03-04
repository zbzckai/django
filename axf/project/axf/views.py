from django.shortcuts import render
from .models import Wheel,Nav,test_table
from django.forms.models import model_to_dict
import pandas as pd
# Create your views here.
def home(request):
    wheelsList = Wheel.objects.all()
    navList = Nav.objects.all()
    print('sssssss')
    print(wheelsList)

    return render(request,'axf/home.html',{'title':'主页','wheelsList':wheelsList,'navList':navList})
def market(request):
    return render(request,'axf/market.html',{'title':'超时'})
def cart(request):
    return render(request,'axf/cart.html',{'title':'大超市'})
def mine(request):
    return render(request,'axf/mine.html',{'title':'我的'})
def echarts(request):
    wheelsList = Wheel.objects.values()
    print('sssssss')
    print(wheelsList)
    print("222222222222222222222222222222222222222222222")
    u_dict = model_to_dict(wheelsList)# queryset转为list
    print(type(u_dict))
    print(u_dict)
    return render(request,'axf/echarts1.html')