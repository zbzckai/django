from django.shortcuts import render
from .models import Wheel,Nav
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