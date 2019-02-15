from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
def index(request):
    return render(request, 'myApp/index.html')

def attri(request):
    print(request.path)
    print(request.method)
    print(request.encoding)
    print(request.GET)
    print(request.POST)
    print(request.FILES)
    print(request.COOKIES)
    print(request.session)
    return HttpResponse('attri')
##获取get传递的数据
def get1(request):
    a = request.GET.get('a')
    b = request.GET['b']
    c = request.GET.get('c')
    return HttpResponse(a+' '+ b +' '+c)
def get2(request):
    a = request.GET.getlist('a')
    a1= a[0]
    a2 = a[1]
    c = request.GET.get('c')
    return HttpResponse(a1+' '+ a2 +' '+c)
def showregist(request):
    return render(request,'myApp/regist.html')
def regist(request):
    name = request.POST.get("name")
    gender = request.POST.get("gender")
    age = request.POST.get("age")
    hobby = request.POST.getlist("hobby")
    print(name )
    return HttpResponse("SASD")
##response
def showresponse(request):
    res = HttpResponse()
    print(res.content)
    print(res.charset)
    print(res.status_code)
    print(res.content-type)
    return res
#cookie
def cookietest(request):
    res = HttpResponse()
    cookie = request.COOKIES
    res.write("<h1>"+cookie["sunck"]+"</h1>")
    #cookie = res.set_cookie('sunck','good')##向cookie中存放数据
    return res
#重定向,输入一的时候展示二的
from django.http import HttpResponseRedirect,JsonResponse
from django.shortcuts import redirect
def redirect1(request):
    #return HttpResponseRedirect('/sunck/redirect2')
    return redirect('/sunck/redirect2')
def redirect2(request):
    return HttpResponse('我是重定向的视图')

def main(request):
    #取session
    username = request.session.get('name','游客')##默认为空，将默认值设置为游客，找不大道就会返回游客
    return render(request,'myApp/main.html',{'username':username})
def login(request):
    return render(request,'myApp/login.html')
def showmain(request):
    username = request.POST.get('username')
    #存储session
    request.session['name'] = username
    request.session.set_expiry(10) ##十秒钟之后过期
    return redirect('/sunck/main')
from django.contrib.auth import logout
def quit(request):
    ##清楚session
    logout(request)
    ##或者使用request.session.flush()
    return redirect('/sunck/main')