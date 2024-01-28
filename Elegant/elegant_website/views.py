from django.shortcuts import render,redirect
from django.contrib.auth.models import User,auth
from django.contrib import messages

# Create your views here.
def index(request):
    return render(request,'index.html')

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
        username=request.POST['Username']
        email=request.POST['Email']
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
            user.save()
            auth.login(request,user)
            return redirect('/')
            # return redirect('login')
    else:
        return render(request,'register.html')

def logout(request):
    auth.logout(request)
    return redirect('/')