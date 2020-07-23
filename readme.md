# SentToDo - Desktop
Windows taskbar panel for displaying notes and tasks
> :warning: **The program is still in development**

![Alt text](images/taskbar%201.png?raw=true "Taskbar 1")

## Installing
Compile or download SentToDo release
Enter the dir with `SentToDo.dll` (`SentToDo\bin\Debug`) and run as admin:  
`%SystemRoot%\Microsoft.NET\Framework64\v4.0.30319\regasm.exe /nologo /codebase SentToDo.dll`  
After restart `explorer` and select ToDoList panel on taskbar right click menu
  
To uninstall:  
`%SystemRoot%\Microsoft.NET\Framework64\v4.0.30319\regasm.exe /unregister /nologo /codebase SentToDo.dll`  
And restart `explorer`