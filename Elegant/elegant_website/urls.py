from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login',views.login,name='login'),
    path('register',views.register,name='register'),
    path('logout',views.logout,name='logout'),
    path('contactus',views.contact,name='contact'),
    path('store',views.store,name='store'),
    path('cart',views.cart,name='cart'),
    path('account',views.account,name='account'),
    path('order',views.order,name='order')
    ]