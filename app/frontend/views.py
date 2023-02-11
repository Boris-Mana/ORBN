from django.shortcuts import render

def index(request):
    print('Запустили стартовую страницу')
    return render(request, 'frontend/index.html')