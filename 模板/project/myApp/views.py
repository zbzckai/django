from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from .models import  Students
def index(request):
    student = Students.objects.get(pk = 1  )
    return render(request, 'myApp/index.html',{'stu':student,'num':10,'str':'sunck is nice man'
                                               ,'list':['good','nice']})
def students(request):
    list = Students.objects.all()
    return render(request,'myApp/students.html',{'students':list})
def good(request,id,id1):
    return render(request,'myApp/good.html',{'num':id,'num1':id1})
def main(request):
    return render(request,'myApp/main.html')