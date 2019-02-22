from django.contrib import admin

# Register your models here.

from .models import Text
admin.site.register(Text)##将model 中的模型注册到站点这样就可以在站点中进行操作了
