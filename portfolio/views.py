from django.shortcuts import render

# Create your views here.

def portHome(request):
    return render(request, 'index.html', context={})

def bookList(request):
    return render(request, 'books.html', context={})

def recipes(request):
    return render(request, 'recipes.html', context={})


