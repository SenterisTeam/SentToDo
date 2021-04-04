#Requires -RunAsAdministrator

$Regasm = $Env:SystemRoot + "\Microsoft.NET\Framework64\v4.0.30319\regasm.exe"
$NewFile = "SentToDo.Deskband\bin\Debug\SentToDo.Deskband.dll"
$BuildPath = Split-Path -Path $NewFile
$ActivatedFile = $BuildPath + "SentToDoActivated.dll"

if (Test-Path $ActivatedFile)
{
    .$Regasm /unregister /nologo /codebase $ActivatedFile
    Stop-Process -ProcessName explorer
    Remove-Item $ActivatedFile
}

Copy-Item -Path $NewFile -Destination $ActivatedFile -force
.$Regasm /nologo /codebase $ActivatedFile
Stop-Process -ProcessName explorer
Start-Process explorer