from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
import os
from django.conf import settings
def index(request):
    return render(request,'myApp/index.html')
def upfile(request):
    return render(request,'myApp/upfile.html')
def savefile(request):
    if request.method == "POST":
        f= request.FILES["file"]
        ##文件在服务器端的路径
        filePath = os.path.join(settings.MDEIA_ROOT,f.name)
        with open(filePath,'wb') as fp:
            for info in f.chunks():##文件传进来的时候以一个文件流，每次接受一部分，chunks就是一段一段的文件流
                fp.write(info)
        return HttpResponse("上传成功")
    else:
        return HttpResponse("上传失败")
from .models import Students
from django.core.paginator import Paginator
def studentpage(request,pageid):
    alllist = Students.objects.all()
    paginator = Paginator(alllist,6)
    page = paginator.page(pageid)
    return render(request,'myApp/studentpage.html',{'students':page})

# return render(request,'myApp/savefile.html')