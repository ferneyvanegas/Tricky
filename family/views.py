from django.shortcuts import render

#Views

def cargarFamily(request):
    return render(request, 'base.html')

def cargarRuleta(request):
    return render(request, 'content/ruleta.html')

def cargarTriky(request):
    return render(request, 'content/triky.html')

