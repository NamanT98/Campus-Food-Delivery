from django.contrib import admin
from .models import Product

class productAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

admin.site.register(Product,productAdmin)
