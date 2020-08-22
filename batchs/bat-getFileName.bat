@echo off
set str=123
REM 就是启用变量延迟，我们可以形象的认为是启用了“对变量动态捕获扩展变化”。而 ! 括起来的变量，就是要动态捕获扩展的目标变量，如果不需要，可以继续使用 % 括变量。
SETLOCAL ENABLEDELAYEDEXPANSION 
@for /f %%i in (filelist.txt) do (
    echo %str%
    set %%i|findstr \<[0-9]\>
    echo !str!
    echo %%i
)
pause

