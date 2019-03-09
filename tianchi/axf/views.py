from django.shortcuts import render
from .models import Wheel,Nav,test_table
from django.forms.models import model_to_dict
from django.core import serializers
import json
import pandas as pd
from django.http import HttpResponse

# Create your views here.
def home(request):
    wheelsList = Wheel.objects.all()
    navList = Nav.objects.all()
    print('sssssss')
    print(wheelsList)
    return render(request,'axf/home.html',{'title':'主页','wheelsList':wheelsList,'navList':navList})
def market(request):
    return render(request,'axf/market.html',{'title':'超时'})
def index(request):
    return render(request,'axf/index.html')
def mine(request):
    return render(request,'axf/mine.html',{'title':'我的'})
def echarts(request):
    wheelsList = Wheel.objects.all()
    name = list(Wheel.objects.values_list('name', flat=True))
    data = list(Wheel.objects.values_list('trackid', flat=True))
    return render(request,'axf/echarts1.html',{"wheelsList":wheelsList,"name":name,"data":data})
def jsdaoru(request):
    wheelsList = Wheel.objects.all()
    name = list(Wheel.objects.values_list('name', flat=True))
    data = list(Wheel.objects.values_list('trackid', flat=True))
    return render(request,'axf/js_daoru.html',{"wheelsList":wheelsList,"name":name,"data":data})

def select_stu(request):
    return render(request,'axf/index.html')