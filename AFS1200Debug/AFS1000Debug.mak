# ---------------------------------------------------------------------------
!if !$d(BCB)
BCB = $(MAKEDIR)\..
!endif

# ---------------------------------------------------------------------------
# IDE SECTION
# ---------------------------------------------------------------------------
# The following section of the project makefile is managed by the BCB IDE.
# It is recommended to use the IDE to change any of the values in this
# section.
# ---------------------------------------------------------------------------

VERSION = BCB.06.00
# ---------------------------------------------------------------------------
PROJECT = AFS1000Debug.exe
OBJFILES = AFS1000Debug.obj uAFSData.obj uParams.obj uPeak.obj uIDCardDef.obj \
    uExcel.obj uTypeConvert.obj uDebugMain.obj uMaintain.obj uUart.obj \
    uCaptions.obj uSetTC.obj
RESFILES = AFS1000Debug.res
MAINSOURCE = AFS1000Debug.cpp
RESDEPEN = $(RESFILES) uDebugMain.dfm uMaintain.dfm uUart.dfm uCaptions.dfm uSetTC.dfm
LIBFILES = 
IDLFILES = 
IDLGENFILES = 
LIBRARIES = vclx.lib bcbsmp.lib bdertl.lib CommonControls.lib AAFont_BCB6.lib \
    vcldb.lib indy.lib Scenery.lib adortl.lib dbrtl.lib rtl.lib vcl.lib
PACKAGES = vcl.bpi rtl.bpi dbrtl.bpi adortl.bpi vcldb.bpi vclx.bpi bdertl.bpi \
    vcldbx.bpi ibxpress.bpi dsnap.bpi cds.bpi bdecds.bpi qrpt.bpi teeui.bpi \
    teedb.bpi tee.bpi dss.bpi teeqr.bpi visualclx.bpi visualdbclx.bpi \
    dsnapcrba.bpi dsnapcon.bpi bcbsmp.bpi vclie.bpi xmlrtl.bpi inet.bpi \
    inetdbbde.bpi inetdbxpress.bpi inetdb.bpi nmfast.bpi webdsnap.bpi \
    bcbie.bpi websnap.bpi soaprtl.bpi dclocx.bpi dbexpress.bpi dbxcds.bpi \
    indy.bpi bcb2kaxserver.bpi AAFont_BCB6.bpi
SPARELIBS = vcl.lib rtl.lib dbrtl.lib adortl.lib Scenery.lib indy.lib vcldb.lib \
    AAFont_BCB6.lib CommonControls.lib bdertl.lib bcbsmp.lib vclx.lib
DEFFILE = 
OTHERFILES = 
# ---------------------------------------------------------------------------
DEBUGLIBPATH = $(BCB)\lib\debug
RELEASELIBPATH = $(BCB)\lib\release
USERDEFINES = _DEBUG
SYSDEFINES = NO_STRICT
INCLUDEPATH = $(BCB)\include;$(BCB)\include\vcl;C:\Users\huangjj\Desktop\debug\AFS1000Debug;C:\Users\huangjj\Desktop\debug\LBControl\CBuilder6;C:\Users\huangjj\Desktop\debug\LBControl\CommonControls;C:\Users\huangjj\Desktop\debug\LBControl\CommonControls\AAFont
LIBPATH = $(BCB)\Projects\Lib;$(BCB)\lib\obj;$(BCB)\lib;C:\Users\huangjj\Desktop\debug\AFS1000Debug;C:\Users\huangjj\Desktop\debug\LBControl\CBuilder6;C:\Users\huangjj\Desktop\debug\LBControl\CommonControls;C:\Users\huangjj\Desktop\debug\LBControl\CommonControls\AAFont
WARNINGS= -w-par
PATHCPP = .;
PATHASM = .;
PATHPAS = .;
PATHRC = .;
PATHOBJ = .;$(LIBPATH)
# ---------------------------------------------------------------------------
CFLAG1 = -Od -H=$(BCB)\lib\vcl60.csm -Hc -Vx -Ve -X- -r- -a8 -b- -k -y -v -vi- -c \
    -tW -tWM
IDLCFLAGS = -I$(BCB)\include -I$(BCB)\include\vcl \
    -IC:\Users\huangjj\Desktop\debug\AFS1000Debug \
    -IC:\Users\huangjj\Desktop\debug\LBControl\CBuilder6 \
    -IC:\Users\huangjj\Desktop\debug\LBControl\CommonControls \
    -IC:\Users\huangjj\Desktop\debug\LBControl\CommonControls\AAFont \
    -src_suffix cpp -D_DEBUG -boa
PFLAGS = -$Y+ -$W -$O- -$A8 -v -JPHNE -M
RFLAGS = 
AFLAGS = /mx /w2 /zi
LFLAGS = -D"" -aa -Tpe -x -Gn -v
# ---------------------------------------------------------------------------
ALLOBJ = c0w32.obj sysinit.obj $(OBJFILES)
ALLRES = $(RESFILES)
ALLLIB = $(LIBFILES) $(LIBRARIES) import32.lib cp32mt.lib
# ---------------------------------------------------------------------------
!ifdef IDEOPTIONS

[Version Info]
IncludeVerInfo=0
AutoIncBuild=0
MajorVer=1
MinorVer=0
Release=0
Build=0
Debug=0
PreRelease=0
Special=0
Private=0
DLL=0

[Version Info Keys]
CompanyName=
FileDescription=
FileVersion=1.0.0.0
InternalName=
LegalCopyright=
LegalTrademarks=
OriginalFilename=
ProductName=
ProductVersion=1.0.0.0
Comments=

[Debugging]
DebugSourceDirs=$(BCB)\source\vcl

!endif





# ---------------------------------------------------------------------------
# MAKE SECTION
# ---------------------------------------------------------------------------
# This section of the project file is not used by the BCB IDE.  It is for
# the benefit of building from the command-line using the MAKE utility.
# ---------------------------------------------------------------------------

.autodepend
# ---------------------------------------------------------------------------
!if "$(USERDEFINES)" != ""
AUSERDEFINES = -d$(USERDEFINES:;= -d)
!else
AUSERDEFINES =
!endif

!if !$d(BCC32)
BCC32 = bcc32
!endif

!if !$d(CPP32)
CPP32 = cpp32
!endif

!if !$d(DCC32)
DCC32 = dcc32
!endif

!if !$d(TASM32)
TASM32 = tasm32
!endif

!if !$d(LINKER)
LINKER = ilink32
!endif

!if !$d(BRCC32)
BRCC32 = brcc32
!endif


# ---------------------------------------------------------------------------
!if $d(PATHCPP)
.PATH.CPP = $(PATHCPP)
.PATH.C   = $(PATHCPP)
!endif

!if $d(PATHPAS)
.PATH.PAS = $(PATHPAS)
!endif

!if $d(PATHASM)
.PATH.ASM = $(PATHASM)
!endif

!if $d(PATHRC)
.PATH.RC  = $(PATHRC)
!endif

!if $d(PATHOBJ)
.PATH.OBJ  = $(PATHOBJ)
!endif
# ---------------------------------------------------------------------------
$(PROJECT): $(OTHERFILES) $(IDLGENFILES) $(OBJFILES) $(RESDEPEN) $(DEFFILE)
    $(BCB)\BIN\$(LINKER) @&&!
    $(LFLAGS) -L$(LIBPATH) +
    $(ALLOBJ), +
    $(PROJECT),, +
    $(ALLLIB), +
    $(DEFFILE), +
    $(ALLRES)
!
# ---------------------------------------------------------------------------
.pas.hpp:
    $(BCB)\BIN\$(DCC32) $(PFLAGS) -U$(INCLUDEPATH) -D$(USERDEFINES);$(SYSDEFINES) -O$(INCLUDEPATH) --BCB {$< }

.pas.obj:
    $(BCB)\BIN\$(DCC32) $(PFLAGS) -U$(INCLUDEPATH) -D$(USERDEFINES);$(SYSDEFINES) -O$(INCLUDEPATH) --BCB {$< }

.cpp.obj:
    $(BCB)\BIN\$(BCC32) $(CFLAG1) $(WARNINGS) -I$(INCLUDEPATH) -D$(USERDEFINES);$(SYSDEFINES) -n$(@D) {$< }

.c.obj:
    $(BCB)\BIN\$(BCC32) $(CFLAG1) $(WARNINGS) -I$(INCLUDEPATH) -D$(USERDEFINES);$(SYSDEFINES) -n$(@D) {$< }

.c.i:
    $(BCB)\BIN\$(CPP32) $(CFLAG1) $(WARNINGS) -I$(INCLUDEPATH) -D$(USERDEFINES);$(SYSDEFINES) -n. {$< }

.cpp.i:
    $(BCB)\BIN\$(CPP32) $(CFLAG1) $(WARNINGS) -I$(INCLUDEPATH) -D$(USERDEFINES);$(SYSDEFINES) -n. {$< }

.asm.obj:
    $(BCB)\BIN\$(TASM32) $(AFLAGS) -i$(INCLUDEPATH:;= -i) $(AUSERDEFINES) -d$(SYSDEFINES:;= -d) $<, $@

.rc.res:
    $(BCB)\BIN\$(BRCC32) $(RFLAGS) -I$(INCLUDEPATH) -D$(USERDEFINES);$(SYSDEFINES) -fo$@ $<



# ---------------------------------------------------------------------------




