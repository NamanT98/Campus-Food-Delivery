from django.shortcuts import render,redirect
from django.contrib.auth.models import User,auth
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from .models import Product
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
def index(request):
    return render(request,'homepage.html')

def login(request):
    if request.method == 'POST':
        username=request.POST['Username']
        password=request.POST['Password']
        user=auth.authenticate(username=username,password=password)
        if user is not None:
            auth.login(request,user)
            return redirect('/')
        else:
            messages.info(request,"Invalid username or password")
            return redirect('login')
        
    else:
        return render(request,'login.html')

def register(request):
    if request.method == 'POST':
        firstname=request.POST['firstname']
        lastname=request.POST['lastname']
        username=request.POST['Username']
        email=request.POST['Email']
        phone=request.POST['phone']
        password=request.POST['Password']

        if User.objects.filter(email=email).exists():
                messages.info(request,"Email already exists")
                return redirect('register')
        elif User.objects.filter(username=username).exists():
            messages.info(request,"Username already exists")
            return redirect('register')
        else:
            user=User.objects.create_user(username=username,
                                        email=email,
                                        password=password)
            user.first_name=firstname
            user.last_name=lastname
            user.contact=phone
            user.save()
            auth.login(request,user)
            return redirect('/')
            # return redirect('login')
    else:
        return render(request,'register.html')

def logout(request):
    auth.logout(request)
    return redirect('/')

def contact(request):
    return render(request,'contactus.html')

def store(request):
    return render(request,"store.html")

def cart(request):
    if request.user.is_authenticated:
        return render(request,"cart.html")
    else:
        return redirect('/login')
    
def ordercnf(request):
    if request.user.is_authenticated:
        return render(request,"ordercnf.html")
    else:
        return redirect('/login')

def account(request):
    if request.user.is_authenticated:
        user=request.user
        if request.method=="POST":
            username=user.username
            old_password=request.POST['old_password']
            user=auth.authenticate(username=username,password=old_password)
            if user is not None:
                new_password1=request.POST['new_password1']
                new_password2=request.POST['new_password2']

                if new_password1 != new_password2:
                    messages.info(request,"Passwords do not match")
                    return redirect('account')
                
                user.set_password(new_password1)
                user.save()
                auth.login(request,user)
                messages.info(request,"Successfully updated password")
                return redirect('account')
            else:
                messages.info(request,"Wrong Password")
                return redirect('account')
        return render(request,"account.html")
    else:
        return redirect('/login')

def get_order(orders):
    names={}
    amount=0
    for order in orders:
        product=Product.objects.get(id=order['id'])
        names[product.name]=order['item']
        amount=amount+product.price*order['item']
    a=""
    for i in names.items():
        a=a+"\n"+"\t"+i[0]+": "+str(i[1])
    return a,amount
@csrf_exempt
def order(request):
    if request.user.is_authenticated:
        user=request.user
        if request.method == 'POST':
            name=user.first_name
            data=json.loads(request.body)
            contact=data['contact']
            address=data['address']
            orders=data['order']
            if orders ==[]:
                return redirect('cart')
            
            order_names,amount=get_order(orders)
            body=f'''Order has been placed with the following details:
Name: {name}
Address: {address}
Contact: {contact}
Order: {order_names}
Total Amount: Rs. {amount}'''
            send_mail(subject="Order Confirmed",
                      message=body,
                      from_email=settings.EMAIL_HOST_USER,
                      recipient_list=[user.email])
            return redirect('ordercnf')
    else:
        return redirect('/login')