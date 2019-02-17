def verifycode(request):
    from PIL import Image,ImageDraw,ImageFont
    import random
    bgcolor = (random.randrange(20,100),random.randrange(20,100),random.randrange(20,100))
    width = 100
    height = 50
    im = Image.new('RGB',(width,height),bgcolor)
    draw = ImageDraw.Draw(im)
    for i in range(0,100):
        xy = (random.randrange(0,width),(random.randrange(0,height)))
        fill = (random.randrange(0,255),255,random.randrange(0,255))
        draw.point(xy,fill=fill)
    str = '1234567890QAZWSXEDCRFVTGBYHNUJMIKOLPqazwsxedcrfvtgbyhnujmikolp'
    rand_str= ''
    for i in range(0,4):
        rand_str+=str[random.randrange(0,len(str))]
    font = ImageFont.truetype(r'C:\Windows\Fonts\Arial.ttf',40)
    fontcolor1 = (255,random.randrange(0,255),random.randrange(0,255))
    fontcolor2 = (255, random.randrange(0, 255), random.randrange(0, 255))
    fontcolor3 = (255, random.randrange(0, 255), random.randrange(0, 255))
    fontcolor4 = (255, random.randrange(0, 255), random.randrange(0, 255))
    draw.text((5,2),rand_str[0],font=font,fill=fontcolor1)
    draw.text((25, 2), rand_str[1], font=font, fill=fontcolor2)
    draw.text((50, 2), rand_str[2], font=font, fill=fontcolor3)
    draw.text((75, 2), rand_str[3], font=font, fill=fontcolor4)
    del draw
    #request.session['verifycode']=rand_str
    import io
    buf = io.BytesIO()
    im.save(buf,'png')
    return HttpResponse(buf.getvalue(),'image/png')