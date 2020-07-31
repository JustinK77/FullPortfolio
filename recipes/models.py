from django.db import models

# Create your models here.
class Recipe(models.Model):
    recipeName = models.CharField(max_length=75)
    mealType = models.CharField(max_length=75)
    nutrition = models.CharField(max_length=75)
    cuisine = models.CharField(max_length=75)
    difficulty = models.CharField(max_length=75)
    recipeLink = models.CharField(max_length=200)
    imageLink = models.CharField(max_length=300)

    def __str__(self):
        return self.recipeName
    


