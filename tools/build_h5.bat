@set PROJ=D:\Jenkins\fish\fishClient

C:\CocosCreator233\CocosCreator.exe --path ..\ --build "platform=web-mobile;embedWebDebugger=false;debug=false;md5Cache=true"

#pscp -l root -pw iVuYwGju8dLA -r ..\build\web-mobile\ 47.94.35.184:/usr/share/nginx/fish99
@pause