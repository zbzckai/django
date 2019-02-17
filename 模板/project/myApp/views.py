from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from .models import Students


def index(request):
    student = Students.objects.get(pk=1)
    return render(request, 'myApp/index.html', {'stu': student, 'num': 10, 'str': 'sunck is nice man'
        , 'list': ['good', 'nice'], "code": "<h1>lalalal</h1>"})


def students(request):
    list = Students.objects.all()
    return render(request, 'myApp/students.html', {'students': list})


def good(request, id, id1):
    return render(request, 'myApp/good.html', {'num': id, 'num1': id1})


def main(request):
    return render(request, 'myApp/main.html')


def postfile(request):
    return render(request, 'myApp/postfile.html')


def showinfo(request):
    name = request.POST.get('username')
    pwd = request.POST.get('passwd')
    return render(request, 'myApp/showinfo.html', {'username': name, 'passwd': pwd})


def verifycode(request):
    from PIL import Image, ImageDraw, ImageFont
    import random
    bgcolor = (random.randrange(20, 100), random.randrange(20, 100), random.randrange(20, 100))
    width = 100
    height = 50
    im = Image.new('RGB', (width, height), bgcolor)
    draw = ImageDraw.Draw(im)
    for i in range(0, 100):
        xy = (random.randrange(0, width), (random.randrange(0, height)))
        fill = (random.randrange(0, 255), 255, random.randrange(0, 255))
        draw.point(xy, fill=fill)
    str = '1234567890QAZWSXEDCRFVTGBYHNUJMIKOLPqazwsxedcrfvtgbyhnujmikolp'
    rand_str = ''
    for i in range(0, 4):
        rand_str += str[random.randrange(0, len(str))]
    font = ImageFont.truetype(r'C:\Windows\Fonts\Arial.ttf', 40)  ##这个地方要改成ttf
    fontcolor1 = (255, random.randrange(0, 255), random.randrange(0, 255))
    fontcolor2 = (255, random.randrange(0, 255), random.randrange(0, 255))
    fontcolor3 = (255, random.randrange(0, 255), random.randrange(0, 255))
    fontcolor4 = (255, random.randrange(0, 255), random.randrange(0, 255))
    draw.text((5, 2), rand_str[0], font=font, fill=fontcolor1)
    draw.text((25, 2), rand_str[1], font=font, fill=fontcolor2)
    draw.text((50, 2), rand_str[2], font=font, fill=fontcolor3)
    draw.text((75, 2), rand_str[3], font=font, fill=fontcolor4)
    del draw
    request.session['verify']=rand_str ##缓存一下跟下面的作对比
    import io
    buf = io.BytesIO()
    im.save(buf, 'png')
    return HttpResponse(buf.getvalue(), 'image/png')
from django.shortcuts import render,redirect

def verifycodefile(request):
    f = request.session.get('flag',True)
    str = ""
    if f == False:
        str = '请重新输入'
    request.session.clear()
    return render(request, 'myApp/verifycodefile.html',{'flag':str})
def verifycodecheck(request):
    code1 = request.POST.get('verifycode').upper()
    code2 = request.session['verify'].upper()
    if code1 == code2:
        return render(request,'myApp/success.html')
    else:
        request.session['flag'] = False
        return redirect('/verifycodefile/')###重定向一下


