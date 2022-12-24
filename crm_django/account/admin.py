from django.contrib import admin
from .models import CustomUser
# Register your models here.

@admin.register(CustomUser)
class AccountAdmin(admin.ModelAdmin):
    list_display = ["first_name" ,"last_name", "username"]