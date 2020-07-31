from django.shortcuts import render
from django.template import loader
from .models import Recipe

# Create your views here.

def mainPage(request):
    recipeList = []
    mainPage = True
    context = {'recipeList' : recipeList, 'mainPage' : mainPage}
    return render(request, 'recipes/recipes.html', context)

def makeSearch(request):
    recipeList = Recipe.objects.all()
    mealType = request.GET['mealType']
    if mealType != "noPref":
        recipeList = recipeList.filter(mealType=mealType)
    difficulty = request.GET['difficulty']
    if difficulty != "noPref":
        recipeList = recipeList.filter(difficulty=difficulty)
    cuisine = request.GET['cuisine']
    if cuisine != "noPref":
        recipeList = recipeList.filter(cuisine=cuisine)
    nutrition = request.GET['nutrition']
    if nutrition != 'noPref':
        recipeList = recipeList.filter(nutrition=nutrition)
    mainPage = False
    
    context = { 'recipeList' : recipeList, 'mainPage' : mainPage}
    return render(request, 'recipes/recipes.html', context)