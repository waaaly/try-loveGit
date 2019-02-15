object frmMaintain: TfrmMaintain
  Left = 511
  Top = 604
  BorderIcons = []
  BorderStyle = bsNone
  Caption = #20449#21495#27979#35797
  ClientHeight = 687
  ClientWidth = 1281
  Color = clBtnFace
  Font.Charset = GB2312_CHARSET
  Font.Color = clNavy
  Font.Height = -16
  Font.Name = #23435#20307
  Font.Style = []
  FormStyle = fsMDIChild
  OldCreateOrder = False
  Position = poMainFormCenter
  Visible = True
  WindowState = wsMaximized
  OnClose = FormClose
  OnCreate = FormCreate
  OnPaint = FormPaint
  OnResize = FormResize
  OnShow = FormShow
  PixelsPerInch = 96
  TextHeight = 16
  object pc: TPageControl
    Left = 0
    Top = 0
    Width = 1281
    Height = 687
    ActivePage = TabSheet1
    Align = alClient
    Style = tsFlatButtons
    TabHeight = 32
    TabIndex = 0
    TabOrder = 0
    object TabSheet1: TTabSheet
      Caption = #27169#22359#35843#35797
      Font.Charset = GB2312_CHARSET
      Font.Color = clNavy
      Font.Height = -16
      Font.Name = #23435#20307
      Font.Style = []
      ParentFont = False
      object p0262: TPanel
        Left = 0
        Top = 0
        Width = 280
        Height = 645
        Align = alLeft
        BevelInner = bvRaised
        BevelOuter = bvLowered
        ParentColor = True
        TabOrder = 0
        object Panel3: TPanel
          Left = 2
          Top = 233
          Width = 276
          Height = 410
          Align = alClient
          Anchors = [akLeft, akTop, akRight]
          BevelOuter = bvNone
          Color = 14080990
          TabOrder = 0
          object Label5: TLabel
            Left = 12
            Top = 210
            Width = 64
            Height = 16
            Caption = #21345#26465#39068#33394
          end
          object let60: TLabeledEdit
            Left = 80
            Top = 42
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 64
            EditLabel.Height = 16
            EditLabel.Caption = #21248#36895#39057#29575
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 0
          end
          object cb601: TButton
            Tag = 601
            Left = 144
            Top = 38
            Width = 48
            Height = 28
            Caption = #35835
            TabOrder = 1
            OnClick = cb51Click
          end
          object cb602: TButton
            Tag = 602
            Left = 204
            Top = 38
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 2
            OnClick = cb51Click
          end
          object let70: TLabeledEdit
            Left = 79
            Top = 138
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 64
            EditLabel.Height = 16
            EditLabel.Caption = #20002#21345#39057#29575
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 3
          end
          object cb6101: TButton
            Tag = 701
            Left = 143
            Top = 134
            Width = 48
            Height = 28
            Caption = #35835
            TabOrder = 4
            OnClick = cb51Click
          end
          object Button6: TButton
            Tag = 702
            Left = 203
            Top = 134
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 5
            OnClick = cb51Click
          end
          object cb6121: TButton
            Tag = 721
            Left = 144
            Top = 164
            Width = 48
            Height = 28
            Caption = #35835
            TabOrder = 6
            OnClick = cb51Click
          end
          object Button10: TButton
            Tag = 722
            Left = 204
            Top = 164
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 7
            OnClick = cb51Click
          end
          object cb72: TCheckBox
            Left = 12
            Top = 171
            Width = 105
            Height = 17
            Alignment = taLeftJustify
            Caption = #30005#26426#38145#27493
            TabOrder = 8
          end
          object let73: TLabeledEdit
            Left = 80
            Top = 276
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 64
            EditLabel.Height = 16
            EditLabel.Caption = #21152#36895#27493#25968
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 9
          end
          object cb6131: TButton
            Tag = 731
            Left = 144
            Top = 272
            Width = 48
            Height = 28
            Caption = #35835
            TabOrder = 10
            OnClick = cb51Click
          end
          object Button17: TButton
            Tag = 732
            Left = 204
            Top = 272
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 11
            OnClick = cb51Click
          end
          object let74: TLabeledEdit
            Left = 81
            Top = 73
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 64
            EditLabel.Height = 16
            EditLabel.Caption = #21152#36895#39057#29575
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 12
          end
          object cb6141: TButton
            Tag = 741
            Left = 145
            Top = 69
            Width = 48
            Height = 28
            Caption = #35835
            TabOrder = 13
            OnClick = cb51Click
          end
          object Button19: TButton
            Tag = 742
            Left = 205
            Top = 69
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 14
            OnClick = cb51Click
          end
          object let75: TLabeledEdit
            Left = 81
            Top = 106
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 64
            EditLabel.Height = 16
            EditLabel.Caption = #20302#36895#39057#29575
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 15
          end
          object let76: TLabeledEdit
            Left = 80
            Top = 319
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 64
            EditLabel.Height = 16
            EditLabel.Caption = #20302#36895#27425#25968
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 16
          end
          object cb6161: TButton
            Tag = 761
            Left = 144
            Top = 315
            Width = 48
            Height = 28
            Caption = #35835
            TabOrder = 17
            OnClick = cb51Click
          end
          object cb6151: TButton
            Tag = 751
            Left = 145
            Top = 102
            Width = 48
            Height = 28
            Caption = #35835
            TabOrder = 18
            OnClick = cb51Click
          end
          object Button22: TButton
            Tag = 752
            Left = 205
            Top = 102
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 19
            OnClick = cb51Click
          end
          object Button23: TButton
            Tag = 762
            Left = 204
            Top = 315
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 20
            OnClick = cb51Click
          end
          object Panel12: TPanel
            Left = 0
            Top = 0
            Width = 276
            Height = 32
            Align = alTop
            BevelOuter = bvNone
            Caption = #30005#26426'/'#35797#21058#21345#39068#33394
            Color = clGray
            Font.Charset = GB2312_CHARSET
            Font.Color = clWhite
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 21
          end
          object cb71: TComboBox
            Left = 80
            Top = 204
            Width = 54
            Height = 24
            Style = csDropDownList
            ItemHeight = 16
            ItemIndex = 0
            TabOrder = 22
            Text = #40657
            Items.Strings = (
              #40657
              #30333)
          end
          object cb6111: TButton
            Tag = 711
            Left = 144
            Top = 202
            Width = 48
            Height = 28
            Caption = #35835
            TabOrder = 23
            OnClick = cb51Click
          end
          object Button8: TButton
            Tag = 712
            Left = 204
            Top = 202
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 24
            OnClick = cb51Click
          end
        end
        object Panel8: TPanel
          Left = 2
          Top = 2
          Width = 276
          Height = 231
          Align = alTop
          BevelOuter = bvNone
          Color = 14080990
          Font.Charset = GB2312_CHARSET
          Font.Color = clNavy
          Font.Height = -16
          Font.Name = #23435#20307
          Font.Style = []
          ParentFont = False
          TabOrder = 1
          object LabeledEdit2: TLabeledEdit
            Left = 94
            Top = 108
            Width = 59
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 88
            EditLabel.Height = 16
            EditLabel.Caption = 'X'#36724#21248#36895#39057#29575
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 0
          end
          object LabeledEdit3: TLabeledEdit
            Left = 94
            Top = 75
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 64
            EditLabel.Height = 16
            EditLabel.Caption = #20809#36335#27493#38271
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 1
          end
          object LabeledEdit5: TLabeledEdit
            Left = 94
            Top = 142
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 88
            EditLabel.Height = 16
            EditLabel.Caption = 'X'#36724#25195#30721#31383#21475
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 2
          end
          object Button28: TButton
            Tag = 852
            Left = 16
            Top = 181
            Width = 249
            Height = 36
            Caption = 'Y'#36724#21040#20002#21345
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 3
            OnClick = cb51Click
          end
          object Button29: TButton
            Tag = 801
            Left = 164
            Top = 71
            Width = 48
            Height = 28
            Caption = #35835
            TabOrder = 4
            OnClick = cb51Click
          end
          object Button30: TButton
            Tag = 802
            Left = 225
            Top = 71
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 5
            OnClick = cb51Click
          end
          object Button31: TButton
            Tag = 811
            Left = 164
            Top = 104
            Width = 48
            Height = 28
            Caption = #35835
            TabOrder = 6
            OnClick = cb51Click
          end
          object Button32: TButton
            Tag = 812
            Left = 225
            Top = 104
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 7
            OnClick = cb51Click
          end
          object Button34: TButton
            Tag = 822
            Left = 225
            Top = 138
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 8
            OnClick = cb51Click
          end
          object Button35: TButton
            Tag = 821
            Left = 164
            Top = 138
            Width = 48
            Height = 28
            Caption = #35835
            TabOrder = 9
            OnClick = cb51Click
          end
          object Panel9: TPanel
            Left = 0
            Top = 0
            Width = 276
            Height = 32
            Align = alTop
            BevelOuter = bvNone
            Caption = #20809#36335#30418
            Color = clGray
            Font.Charset = GB2312_CHARSET
            Font.Color = clWhite
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 10
          end
          object Button37: TButton
            Tag = 851
            Left = 168
            Top = 40
            Width = 89
            Height = 25
            Caption = #36208#20809#36335#30418
            TabOrder = 11
            OnClick = cb51Click
          end
          object LabeledEdit1: TLabeledEdit
            Left = 94
            Top = 43
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 80
            EditLabel.Height = 16
            EditLabel.Caption = #24403#21069#36890#36947#21495
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 12
            Text = '0'
          end
        end
      end
      object Panel1: TPanel
        Left = 880
        Top = 0
        Width = 393
        Height = 645
        Align = alClient
        BevelOuter = bvLowered
        TabOrder = 1
        object Panel13: TPanel
          Left = 1
          Top = 1
          Width = 391
          Height = 87
          Align = alTop
          TabOrder = 0
          object cbMsg: TCheckBox
            Left = 16
            Top = 64
            Width = 137
            Height = 17
            Caption = #26174#31034#25910#21457#20449#24687
            TabOrder = 0
            Visible = False
            OnClick = cbMsgClick
          end
          object Button26: TButton
            Left = 9
            Top = 9
            Width = 128
            Height = 32
            Caption = #35835#21462#25152#26377#21442#25968
            TabOrder = 1
            OnClick = Button26Click
          end
          object btnSaveParam: TButton
            Left = 153
            Top = 9
            Width = 109
            Height = 32
            Caption = #20445#23384#21442#25968
            TabOrder = 2
            OnClick = btnSaveParamClick
          end
          object Button16: TButton
            Left = 273
            Top = 9
            Width = 109
            Height = 32
            Caption = #35843#21462#21442#25968
            TabOrder = 3
            OnClick = Button16Click
          end
        end
        object m: TMemo
          Left = 1
          Top = 88
          Width = 391
          Height = 556
          Align = alClient
          BorderStyle = bsNone
          Color = 13684944
          Font.Charset = GB2312_CHARSET
          Font.Color = clNavy
          Font.Height = -15
          Font.Name = #23435#20307
          Font.Style = []
          ParentFont = False
          TabOrder = 1
          Visible = False
          WordWrap = False
          OnDblClick = mDblClick
        end
      end
      object Panel15: TPanel
        Left = 580
        Top = 0
        Width = 300
        Height = 645
        Align = alLeft
        BevelInner = bvRaised
        BevelOuter = bvLowered
        TabOrder = 2
        object Panel2: TPanel
          Left = 2
          Top = 193
          Width = 296
          Height = 136
          Align = alTop
          BevelOuter = bvNone
          Color = 14080990
          TabOrder = 0
          object cb43: TButton
            Tag = 43
            Left = 214
            Top = 39
            Width = 59
            Height = 36
            Caption = #22797#20301
            TabOrder = 0
            OnClick = cb51Click
          end
          object cb44: TButton
            Tag = 44
            Left = 213
            Top = 85
            Width = 60
            Height = 32
            Caption = #24453#26426#20301
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 1
            OnClick = cb51Click
          end
          object Button4: TButton
            Tag = 13
            Left = 0
            Top = 37
            Width = 56
            Height = 36
            Caption = #26377#21345'?'
            TabOrder = 2
            OnClick = cb51Click
          end
          object Button24: TButton
            Tag = 14
            Left = 104
            Top = 39
            Width = 64
            Height = 34
            Caption = #26377'ID?'
            TabOrder = 3
            OnClick = cb51Click
          end
          object pID: TPanel
            Left = 116
            Top = 85
            Width = 45
            Height = 32
            BevelOuter = bvLowered
            TabOrder = 4
          end
          object pCard: TPanel
            Left = 52
            Top = 85
            Width = 45
            Height = 32
            BevelOuter = bvLowered
            TabOrder = 5
          end
          object Panel17: TPanel
            Left = 0
            Top = 0
            Width = 296
            Height = 32
            Align = alTop
            BevelOuter = bvNone
            Caption = #21151#33021#27979#35797
            Color = clGray
            Font.Charset = GB2312_CHARSET
            Font.Color = clWhite
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 6
          end
          object pCard1: TPanel
            Left = 0
            Top = 85
            Width = 41
            Height = 32
            BevelOuter = bvLowered
            TabOrder = 7
          end
        end
        object pDev: TPanel
          Left = 2
          Top = 2
          Width = 296
          Height = 191
          Align = alTop
          BevelOuter = bvNone
          Color = 14080990
          TabOrder = 1
          object Label8: TLabel
            Left = 1
            Top = 127
            Width = 64
            Height = 16
            Caption = #20202#22120#22411#21495
          end
          object le51: TLabeledEdit
            Left = 75
            Top = 41
            Width = 49
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 64
            EditLabel.Height = 16
            EditLabel.Caption = #20844#21496#20195#30721
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 0
          end
          object le53: TLabeledEdit
            Left = 75
            Top = 96
            Width = 179
            Height = 24
            Color = clBtnFace
            Ctl3D = True
            EditLabel.Width = 48
            EditLabel.Height = 16
            EditLabel.Caption = #29256#26412#21495
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            ReadOnly = True
            TabOrder = 1
          end
          object le55: TLabeledEdit
            Left = 75
            Top = 152
            Width = 94
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 64
            EditLabel.Height = 16
            EditLabel.Caption = #20202#22120#32534#21495
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 2
          end
          object cb51: TButton
            Tag = 51
            Left = 144
            Top = 39
            Width = 48
            Height = 26
            Caption = #35835
            TabOrder = 3
            OnClick = cb51Click
          end
          object cb52: TButton
            Tag = 52
            Left = 212
            Top = 39
            Width = 48
            Height = 26
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 4
            OnClick = cb51Click
          end
          object le52: TLabeledEdit
            Left = 75
            Top = 69
            Width = 179
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 64
            EditLabel.Height = 16
            EditLabel.Caption = #20844#21496#21517#31216
            LabelPosition = lpLeft
            LabelSpacing = 3
            MaxLength = 30
            ParentCtl3D = False
            TabOrder = 5
          end
          object cbType: TComboBox
            Left = 75
            Top = 124
            Width = 94
            Height = 24
            Style = csDropDownList
            Color = 14150640
            ItemHeight = 16
            ItemIndex = 4
            TabOrder = 6
            Text = 'AFS1200'
            Items.Strings = (
              'AFS1000'
              'AFS2000'
              'AFS3000'
              'AFS4000'
              'AFS1200')
          end
          object Panel16: TPanel
            Left = 0
            Top = 0
            Width = 296
            Height = 32
            Align = alTop
            BevelOuter = bvNone
            Caption = ' '#20202#22120#26426#36523#20449#24687' '
            Color = clGray
            Font.Charset = GB2312_CHARSET
            Font.Color = clWhite
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 7
          end
        end
      end
      object Panel19: TPanel
        Left = 280
        Top = 0
        Width = 300
        Height = 645
        Align = alLeft
        BevelInner = bvRaised
        BevelOuter = bvLowered
        TabOrder = 3
        object Panel10: TPanel
          Left = 2
          Top = 2
          Width = 296
          Height = 641
          Align = alClient
          BevelOuter = bvNone
          Color = 14080990
          TabOrder = 0
          object let61: TLabeledEdit
            Left = 110
            Top = 84
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 72
            EditLabel.Height = 16
            EditLabel.Caption = 'X'#21407#28857#26465#30721
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 0
          end
          object let63: TLabeledEdit
            Left = 110
            Top = 144
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 80
            EditLabel.Height = 16
            EditLabel.Caption = #26465#30721'1 list'
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 1
          end
          object let62: TLabeledEdit
            Left = 110
            Top = 115
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 64
            EditLabel.Height = 16
            EditLabel.Caption = #26465#30721#38271#24230
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 2
          end
          object let64: TLabeledEdit
            Left = 110
            Top = 173
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 64
            EditLabel.Height = 16
            EditLabel.Caption = #26465#30721#36317#31163
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 3
          end
          object let65: TLabeledEdit
            Left = 110
            Top = 203
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 96
            EditLabel.Height = 16
            EditLabel.Caption = #26465#30721#25918#22823#20493#25968
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 4
          end
          object let66: TLabeledEdit
            Left = 110
            Top = 261
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 80
            EditLabel.Height = 16
            EditLabel.Caption = 'X'#21407#28857'-'#27979#35797
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 5
          end
          object let67: TLabeledEdit
            Left = 110
            Top = 290
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 96
            EditLabel.Height = 16
            EditLabel.Caption = #27979#35797#31383#21475#38271#24230
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 6
          end
          object let68: TLabeledEdit
            Left = 110
            Top = 232
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 64
            EditLabel.Height = 16
            EditLabel.Caption = #26465#24418#36830#32493
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 7
          end
          object cb681: TButton
            Tag = 681
            Left = 172
            Top = 228
            Width = 48
            Height = 28
            Caption = #35835
            TabOrder = 8
            OnClick = cb51Click
          end
          object cb682: TButton
            Tag = 682
            Left = 233
            Top = 228
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 9
            OnClick = cb51Click
          end
          object cb671: TButton
            Tag = 671
            Left = 172
            Top = 287
            Width = 48
            Height = 28
            Caption = #35835
            TabOrder = 10
            OnClick = cb51Click
          end
          object cb672: TButton
            Tag = 672
            Left = 233
            Top = 287
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 11
            OnClick = cb51Click
          end
          object cb661: TButton
            Tag = 661
            Left = 172
            Top = 258
            Width = 48
            Height = 28
            Caption = #35835
            TabOrder = 12
            OnClick = cb51Click
          end
          object cb662: TButton
            Tag = 662
            Left = 233
            Top = 258
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 13
            OnClick = cb51Click
          end
          object cb621: TButton
            Tag = 621
            Left = 172
            Top = 111
            Width = 48
            Height = 28
            Caption = #35835
            TabOrder = 14
            OnClick = cb51Click
          end
          object cb622: TButton
            Tag = 622
            Left = 233
            Top = 111
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 15
            OnClick = cb51Click
          end
          object cb631: TButton
            Tag = 631
            Left = 172
            Top = 140
            Width = 48
            Height = 28
            Caption = #35835
            TabOrder = 16
            OnClick = cb51Click
          end
          object cb632: TButton
            Tag = 632
            Left = 233
            Top = 140
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 17
            OnClick = cb51Click
          end
          object cb642: TButton
            Tag = 642
            Left = 233
            Top = 170
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 18
            OnClick = cb51Click
          end
          object cb652: TButton
            Tag = 652
            Left = 233
            Top = 199
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 19
            OnClick = cb51Click
          end
          object cb651: TButton
            Tag = 651
            Left = 172
            Top = 199
            Width = 48
            Height = 28
            Caption = #35835
            TabOrder = 20
            OnClick = cb51Click
          end
          object cb641: TButton
            Tag = 641
            Left = 172
            Top = 170
            Width = 48
            Height = 28
            Caption = #35835
            TabOrder = 21
            OnClick = cb51Click
          end
          object cb611: TButton
            Tag = 611
            Left = 172
            Top = 80
            Width = 48
            Height = 27
            Caption = #35835
            TabOrder = 22
            OnClick = cb51Click
          end
          object cb612: TButton
            Tag = 612
            Left = 233
            Top = 80
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 23
            OnClick = cb51Click
          end
          object let69: TLabeledEdit
            Left = 110
            Top = 320
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 96
            EditLabel.Height = 16
            EditLabel.Caption = #27979#35797#25918#22823#20493#25968
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 24
          end
          object cb691: TButton
            Tag = 691
            Left = 172
            Top = 317
            Width = 48
            Height = 28
            Caption = #35835
            TabOrder = 25
            OnClick = cb51Click
          end
          object cb692: TButton
            Tag = 692
            Left = 233
            Top = 317
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 26
            OnClick = cb51Click
          end
          object Panel14: TPanel
            Left = 0
            Top = 0
            Width = 296
            Height = 30
            Align = alTop
            BevelOuter = bvNone
            Caption = #26465#30721'/'#27979#35797
            Color = clGray
            Font.Charset = GB2312_CHARSET
            Font.Color = clWhite
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 27
          end
          object CheckBox1: TCheckBox
            Left = 24
            Top = 48
            Width = 97
            Height = 25
            Alignment = taLeftJustify
            BiDiMode = bdLeftToRight
            Caption = #21333#36890#36947
            Color = 14080990
            Enabled = False
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -24
            Font.Name = #23435#20307
            Font.Style = []
            ParentBiDiMode = False
            ParentColor = False
            ParentFont = False
            ParentShowHint = False
            ShowHint = False
            TabOrder = 28
          end
          object Button5: TButton
            Tag = 872
            Left = 233
            Top = 397
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 29
            OnClick = cb51Click
          end
          object Button9: TButton
            Tag = 871
            Left = 172
            Top = 397
            Width = 48
            Height = 28
            Caption = #35835
            TabOrder = 30
            OnClick = cb51Click
          end
          object LabeledEdit7: TLabeledEdit
            Left = 110
            Top = 400
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 64
            EditLabel.Height = 16
            EditLabel.Caption = #20002#21345#27493#25968
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 31
          end
          object LabeledEdit8: TLabeledEdit
            Left = 110
            Top = 432
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 88
            EditLabel.Height = 16
            EditLabel.Caption = 'Y'#36724#26465#30721#20301#32622
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 32
          end
          object Button18: TButton
            Tag = 873
            Left = 172
            Top = 429
            Width = 48
            Height = 28
            Caption = #35835
            TabOrder = 33
            OnClick = cb51Click
          end
          object Button39: TButton
            Tag = 874
            Left = 233
            Top = 429
            Width = 48
            Height = 28
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 34
            OnClick = cb51Click
          end
        end
      end
    end
    object TabSheet6: TTabSheet
      Caption = #26465#30721#27979#35797
      ImageIndex = 5
      object Panel4: TPanel
        Left = 0
        Top = 0
        Width = 1273
        Height = 645
        Align = alClient
        BevelOuter = bvLowered
        TabOrder = 0
        object Panel6: TPanel
          Left = 1
          Top = 1
          Width = 1271
          Height = 124
          Align = alTop
          TabOrder = 0
          object Panel7: TPanel
            Left = 1
            Top = 4
            Width = 136
            Height = 41
            BevelOuter = bvLowered
            Caption = #26465#30721#25195#25551#27979#35797
            Color = clNavy
            Font.Charset = GB2312_CHARSET
            Font.Color = clYellow
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 0
          end
          object letStart: TLabeledEdit
            Left = 506
            Top = 14
            Width = 60
            Height = 24
            Color = 14737632
            EditLabel.Width = 32
            EditLabel.Height = 16
            EditLabel.Caption = #36215#28857
            LabelPosition = lpLeft
            LabelSpacing = 3
            TabOrder = 1
          end
          object letEnd: TLabeledEdit
            Left = 605
            Top = 14
            Width = 60
            Height = 24
            Color = 14737632
            EditLabel.Width = 32
            EditLabel.Height = 16
            EditLabel.Caption = #32456#28857
            LabelPosition = lpLeft
            LabelSpacing = 3
            TabOrder = 2
          end
          object letCnt: TLabeledEdit
            Left = 706
            Top = 14
            Width = 60
            Height = 24
            Color = 14737632
            EditLabel.Width = 32
            EditLabel.Height = 16
            EditLabel.Caption = #20010#25968
            LabelPosition = lpLeft
            LabelSpacing = 3
            TabOrder = 3
          end
          object letbc1: TLabeledEdit
            Left = 282
            Top = 57
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 72
            EditLabel.Height = 16
            EditLabel.Caption = 'X'#21407#28857#26465#30721
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 4
          end
          object letbc2: TLabeledEdit
            Left = 282
            Top = 92
            Width = 58
            Height = 24
            Color = 14150640
            Ctl3D = True
            EditLabel.Width = 96
            EditLabel.Height = 16
            EditLabel.Caption = #26465#30721#25918#22823#20493#25968
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentCtl3D = False
            TabOrder = 5
          end
          object letbc3: TLabeledEdit
            Left = 506
            Top = 51
            Width = 60
            Height = 23
            Color = 14737632
            EditLabel.Width = 30
            EditLabel.Height = 15
            EditLabel.Caption = #26465#30721
            EditLabel.Font.Charset = GB2312_CHARSET
            EditLabel.Font.Color = clNavy
            EditLabel.Font.Height = -15
            EditLabel.Font.Name = #23435#20307
            EditLabel.Font.Style = []
            EditLabel.ParentFont = False
            Font.Charset = GB2312_CHARSET
            Font.Color = clNavy
            Font.Height = -15
            Font.Name = #23435#20307
            Font.Style = []
            LabelPosition = lpLeft
            LabelSpacing = 3
            ParentFont = False
            TabOrder = 6
          end
          object cbBCClear: TButton
            Tag = 2
            Left = 150
            Top = 6
            Width = 64
            Height = 35
            Caption = #28165#38500
            TabOrder = 7
            OnClick = cbBCClearClick
          end
          object cbBCTest: TButton
            Tag = 3
            Left = 310
            Top = 6
            Width = 64
            Height = 35
            Caption = #27979#35797
            TabOrder = 8
            OnClick = cbBCTestClick
          end
          object Button12: TButton
            Tag = 911
            Left = 343
            Top = 53
            Width = 48
            Height = 30
            Caption = #35835
            TabOrder = 9
            OnClick = cb51Click
          end
          object Button13: TButton
            Tag = 912
            Left = 406
            Top = 53
            Width = 48
            Height = 30
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 10
            OnClick = cb51Click
          end
          object Button14: TButton
            Tag = 952
            Left = 406
            Top = 88
            Width = 48
            Height = 30
            Caption = #20889
            Font.Charset = GB2312_CHARSET
            Font.Color = clRed
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 11
            OnClick = cb51Click
          end
          object Button15: TButton
            Tag = 951
            Left = 343
            Top = 88
            Width = 48
            Height = 30
            Caption = #35835
            TabOrder = 12
            OnClick = cb51Click
          end
          object Edit1: TEdit
            Left = 780
            Top = 13
            Width = 57
            Height = 24
            Color = clBtnFace
            ReadOnly = True
            TabOrder = 13
          end
          object leCnt: TLabeledEdit
            Left = 8
            Top = 76
            Width = 81
            Height = 24
            EditLabel.Width = 80
            EditLabel.Height = 16
            EditLabel.Caption = #25968#25454#28857#20010#25968
            LabelPosition = lpAbove
            LabelSpacing = 3
            TabOrder = 14
          end
          object lefname: TLabeledEdit
            Left = 874
            Top = 48
            Width = 129
            Height = 24
            EditLabel.Width = 80
            EditLabel.Height = 16
            EditLabel.Caption = #20445#23384#25991#20214#21517
            LabelPosition = lpAbove
            LabelSpacing = 3
            TabOrder = 15
          end
          object Button1: TButton
            Left = 872
            Top = 80
            Width = 60
            Height = 35
            Caption = #20445#23384
            TabOrder = 16
            OnClick = Button1Click
          end
          object Button2: TButton
            Left = 944
            Top = 80
            Width = 60
            Height = 35
            Caption = #35835#21462
            TabOrder = 17
            OnClick = Button2Click
          end
          object Button3: TButton
            Left = 390
            Top = 6
            Width = 64
            Height = 35
            Caption = #20998#26512
            TabOrder = 18
            OnClick = Button3Click
          end
          object Button25: TButton
            Left = 93
            Top = 72
            Width = 60
            Height = 30
            Caption = #20445#23384
            TabOrder = 19
            OnClick = Button25Click
          end
          object Button7: TButton
            Tag = 43
            Left = 230
            Top = 6
            Width = 64
            Height = 35
            Caption = #22797#20301
            TabOrder = 20
            OnClick = cb51Click
          end
          object btnAuto: TButton
            Left = 708
            Top = 64
            Width = 93
            Height = 41
            Caption = #33258#21160#35843#35797
            TabOrder = 21
            Visible = False
            OnClick = btnAutoClick
          end
          object leBC: TLabeledEdit
            Left = 642
            Top = 81
            Width = 60
            Height = 23
            Color = 14737632
            EditLabel.Width = 60
            EditLabel.Height = 15
            EditLabel.Caption = #30446#26631#26465#30721
            EditLabel.Font.Charset = GB2312_CHARSET
            EditLabel.Font.Color = clNavy
            EditLabel.Font.Height = -15
            EditLabel.Font.Name = #23435#20307
            EditLabel.Font.Style = []
            EditLabel.ParentFont = False
            Font.Charset = GB2312_CHARSET
            Font.Color = clNavy
            Font.Height = -15
            Font.Name = #23435#20307
            Font.Style = []
            LabelPosition = lpAbove
            LabelSpacing = 3
            ParentFont = False
            TabOrder = 22
            Visible = False
          end
        end
        object rcBC: TRespChart
          Left = 1
          Top = 125
          Width = 804
          Height = 519
          CActiveLine = clRed
          CAxisLine = clGreen
          CAxisText = clNavy
          CCrossLine = clRed
          CDataBack = clTeal
          CDataText = clYellow
          CDataLine = clNavy
          CGridLine = clGray
          CLegendBack = clNavy
          CLegendText = clYellow
          CPeakDot = clRed
          BCross = True
          BRight = True
          BShowY = True
          BorderWidth = 10
          AxisXName = #24207#21495
          AxisYName = #27979#35797#20540
          Align = alLeft
          Color = 14737632
          ParentColor = False
          Font.Charset = GB2312_CHARSET
          Font.Color = clNavy
          Font.Height = -12
          Font.Name = #23435#20307
          Font.Style = []
        end
        object Panel18: TPanel
          Left = 805
          Top = 125
          Width = 467
          Height = 519
          Align = alClient
          BevelOuter = bvNone
          TabOrder = 2
          object sgBC: TFillStringGrid
            Left = 0
            Top = 208
            Width = 467
            Height = 311
            Align = alClient
            BorderStyle = bsNone
            Color = 14737632
            ColCount = 2
            DefaultColWidth = 45
            DefaultRowHeight = 17
            RowCount = 175
            Font.Charset = GB2312_CHARSET
            Font.Color = clNavy
            Font.Height = -12
            Font.Name = #23435#20307
            Font.Style = []
            Options = [goFixedVertLine, goFixedHorzLine, goVertLine, goHorzLine, goRangeSelect, goColSizing]
            ParentFont = False
            TabOrder = 0
            OnClick = sgBCClick
            FixedFont = clNavy
            SelectBack = clNavy
            SelectText = clYellow
            AlignFixed = taCenter
            AlignCell = taRightJustify
            HeaderCol.Strings = (
              ''
              '1')
            HeaderRow.Strings = (
              '0'
              '1'
              '2'
              '3'
              '4'
              '5'
              '6'
              '7'
              '8'
              '9'
              '10'
              '11'
              '12'
              '13'
              '14'
              '15')
            AutoColHeader = True
            AutoRowHeader = True
            CanPaste = True
            RowHeights = (
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17
              17)
          end
          object Panel5: TPanel
            Left = 0
            Top = 0
            Width = 467
            Height = 208
            Align = alTop
            BevelInner = bvLowered
            BorderWidth = 5
            Caption = 'Panel5'
            TabOrder = 1
            object mBC: TMemo
              Left = 7
              Top = 7
              Width = 453
              Height = 194
              Align = alClient
              BevelInner = bvNone
              BevelOuter = bvNone
              BorderStyle = bsNone
              Color = 14737632
              Lines.Strings = (
                '1'
                '2'
                '3'
                '4'
                '5'
                '6'
                '7'
                '8'
                '9'
                '1'
                '0')
              TabOrder = 0
            end
          end
        end
      end
    end
    object TabSheet5: TTabSheet
      Caption = #37325#22797#24615#27979#35797
      ImageIndex = 4
      object p3: TPanel
        Left = 0
        Top = 0
        Width = 969
        Height = 645
        Align = alClient
        BevelOuter = bvLowered
        Color = 13684944
        TabOrder = 0
        object p33: TPanel
          Left = 1
          Top = 496
          Width = 692
          Height = 90
          Align = alBottom
          BevelOuter = bvNone
          TabOrder = 1
          object sgCV: TFillStringGrid
            Left = 262
            Top = 0
            Width = 430
            Height = 90
            Align = alRight
            BorderStyle = bsNone
            Color = 15790320
            ColCount = 6
            DefaultColWidth = 70
            DefaultRowHeight = 20
            FixedColor = clMoneyGreen
            RowCount = 2
            Font.Charset = GB2312_CHARSET
            Font.Color = clNavy
            Font.Height = -15
            Font.Name = #23435#20307
            Font.Style = []
            Options = [goFixedVertLine, goFixedHorzLine, goVertLine, goHorzLine, goRangeSelect, goColSizing, goEditing]
            ParentFont = False
            ScrollBars = ssNone
            TabOrder = 0
            FixedFont = clNavy
            SelectBack = clNavy
            SelectText = clYellow
            AlignFixed = taCenter
            AlignCell = taRightJustify
            HeaderCol.Strings = (
              #25968#25454#39033
              #24179#22343#20540
              #26631#20934#20559#24046
              'CV'#20540
              #26368#22823#20540
              #26368#23567#20540)
            CanPaste = True
          end
          object sgCalc: TFillStringGrid
            Tag = 1
            Left = 0
            Top = 0
            Width = 262
            Height = 90
            Align = alClient
            BorderStyle = bsNone
            Color = 13684944
            ColCount = 2
            DefaultColWidth = 70
            DefaultRowHeight = 20
            FixedColor = clSilver
            Font.Charset = GB2312_CHARSET
            Font.Color = clNavy
            Font.Height = -15
            Font.Name = #23435#20307
            Font.Style = []
            Options = [goFixedVertLine, goFixedHorzLine, goVertLine, goHorzLine, goRangeSelect, goColSizing, goEditing]
            ParentFont = False
            ScrollBars = ssNone
            TabOrder = 1
            OnClick = sgTestClick
            FixedFont = clNavy
            SelectBack = clNavy
            SelectText = clYellow
            AlignFixed = taCenter
            AlignCell = taRightJustify
            CanPaste = True
            RowHeights = (
              20
              20
              20
              20
              20)
          end
        end
        object sgTest: TFillStringGrid
          Left = 1
          Top = 389
          Width = 692
          Height = 107
          Align = alClient
          BorderStyle = bsNone
          Color = clBtnFace
          ColCount = 2
          DefaultColWidth = 70
          DefaultRowHeight = 17
          RowCount = 175
          Font.Charset = GB2312_CHARSET
          Font.Color = clNavy
          Font.Height = -15
          Font.Name = #23435#20307
          Font.Style = []
          Options = [goFixedVertLine, goFixedHorzLine, goVertLine, goHorzLine, goRangeSelect, goColSizing]
          ParentFont = False
          TabOrder = 2
          OnClick = sgTestClick
          FixedFont = clNavy
          SelectBack = clNavy
          SelectText = clYellow
          AlignFixed = taCenter
          AlignCell = taRightJustify
          HeaderCol.Strings = (
            ''
            '1')
          HeaderRow.Strings = (
            '0'
            '1'
            '2'
            '3'
            '4'
            '5'
            '6'
            '7'
            '8'
            '9'
            '10'
            '11'
            '12'
            '13'
            '14'
            '15')
          AutoColHeader = True
          AutoRowHeader = True
          CanPaste = True
          RowHeights = (
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17
            17)
        end
        object p31: TPanel
          Left = 1
          Top = 41
          Width = 692
          Height = 348
          Align = alTop
          BevelOuter = bvNone
          ParentColor = True
          TabOrder = 0
          object rc: TRespChart
            Left = 0
            Top = 0
            Width = 692
            Height = 348
            Hint = #21452#20987#20999#25442#26174#31034#21306#22495#22823#23567
            CActiveLine = clRed
            CAxisLine = clGreen
            CAxisText = clNavy
            CCrossLine = clRed
            CDataBack = clTeal
            CDataText = clYellow
            CDataLine = clNavy
            CGridLine = clGray
            CLegendBack = clNavy
            CLegendText = clYellow
            CPeakDot = clRed
            BCross = True
            BRight = True
            BShowY = True
            BShowPeak = True
            BorderWidth = 10
            AxisXName = #24207#21495
            AxisYName = #27979#35797#20540
            PeakDefs.Strings = (
              '0,13,73,5'
              '1,90,150,5')
            Align = alClient
            Color = 14737632
            ParentColor = False
            Font.Charset = GB2312_CHARSET
            Font.Color = clNavy
            Font.Height = -12
            Font.Name = #23435#20307
            Font.Style = []
            OnDblClick = rcDblClick
          end
        end
        object Panel21: TPanel
          Left = 1
          Top = 1
          Width = 692
          Height = 40
          Align = alTop
          TabOrder = 3
          object Panel22: TPanel
            Left = 247
            Top = 1
            Width = 444
            Height = 38
            Align = alRight
            BevelOuter = bvNone
            TabOrder = 0
            object cbtNew: TButton
              Left = 3
              Top = 2
              Width = 56
              Height = 33
              Caption = #26032#24314
              Font.Charset = GB2312_CHARSET
              Font.Color = clNavy
              Font.Height = -16
              Font.Name = #23435#20307
              Font.Style = []
              ParentFont = False
              TabOrder = 0
              OnClick = cbtNewClick
            end
            object cbtOpen: TButton
              Left = 63
              Top = 2
              Width = 56
              Height = 33
              Caption = #25171#24320
              Font.Charset = GB2312_CHARSET
              Font.Color = clNavy
              Font.Height = -16
              Font.Name = #23435#20307
              Font.Style = []
              ParentFont = False
              TabOrder = 1
              OnClick = cbtOpenClick
            end
            object cbtSave: TButton
              Left = 123
              Top = 2
              Width = 56
              Height = 33
              Caption = #20445#23384
              Font.Charset = GB2312_CHARSET
              Font.Color = clNavy
              Font.Height = -16
              Font.Name = #23435#20307
              Font.Style = []
              ParentFont = False
              TabOrder = 2
              OnClick = cbtSaveClick
            end
            object cbtTxt: TButton
              Left = 183
              Top = 2
              Width = 56
              Height = 33
              Caption = 'EXCEL'
              Font.Charset = GB2312_CHARSET
              Font.Color = clNavy
              Font.Height = -16
              Font.Name = #23435#20307
              Font.Style = []
              ParentFont = False
              TabOrder = 3
              OnClick = cbtTxtClick
            end
            object btnPaste: TButton
              Left = 253
              Top = 2
              Width = 56
              Height = 33
              Caption = #31896#36148
              Font.Charset = GB2312_CHARSET
              Font.Color = clNavy
              Font.Height = -16
              Font.Name = #23435#20307
              Font.Style = []
              ParentFont = False
              TabOrder = 4
              OnClick = btnPasteClick
            end
            object btnDel: TButton
              Left = 316
              Top = 2
              Width = 56
              Height = 33
              Caption = #21024#21015
              Enabled = False
              Font.Charset = GB2312_CHARSET
              Font.Color = clNavy
              Font.Height = -16
              Font.Name = #23435#20307
              Font.Style = []
              ParentFont = False
              TabOrder = 5
              OnClick = btnDelClick
            end
            object cbtCalc: TButton
              Left = 385
              Top = 2
              Width = 56
              Height = 33
              Caption = #35745#31639
              Font.Charset = GB2312_CHARSET
              Font.Color = clNavy
              Font.Height = -16
              Font.Name = #23435#20307
              Font.Style = []
              ParentFont = False
              TabOrder = 6
              OnClick = cbtCalcClick
            end
          end
          object pFile: TPanel
            Left = 1
            Top = 1
            Width = 246
            Height = 38
            Align = alClient
            BevelOuter = bvNone
            TabOrder = 1
            object letFile: TEdit
              Left = 8
              Top = 8
              Width = 369
              Height = 24
              Color = 14737632
              ReadOnly = True
              TabOrder = 0
            end
          end
        end
      end
      object p4: TPanel
        Left = 969
        Top = 0
        Width = 304
        Height = 645
        Align = alRight
        BevelOuter = bvNone
        Font.Charset = GB2312_CHARSET
        Font.Color = clNavy
        Font.Height = -15
        Font.Name = #23435#20307
        Font.Style = []
        ParentColor = True
        ParentFont = False
        TabOrder = 1
        object p42: TPanel
          Left = 0
          Top = 122
          Width = 304
          Height = 158
          Align = alTop
          BevelOuter = bvLowered
          TabOrder = 0
          object fsgPeak: TFillStringGrid
            Left = 1
            Top = 65
            Width = 302
            Height = 92
            Hint = #21452#20987#34892#26631#39064#23792#23450#20041#33258#21160#23545#20013
            Align = alClient
            BorderStyle = bsNone
            Color = 14737632
            DefaultColWidth = 40
            DefaultRowHeight = 22
            RowCount = 4
            Font.Charset = GB2312_CHARSET
            Font.Color = clNavy
            Font.Height = -15
            Font.Name = #23435#20307
            Font.Style = []
            Options = [goFixedVertLine, goFixedHorzLine, goVertLine, goHorzLine, goRangeSelect, goEditing]
            ParentFont = False
            ScrollBars = ssNone
            TabOrder = 0
            OnDblClick = fsgPeakDblClick
            OnMouseMove = fsgPeakMouseMove
            OnSetEditText = fsgPeakSetEditText
            FixedFont = clNavy
            SelectBack = clNavy
            SelectText = clYellow
            AlignFixed = taCenter
            AlignCell = taCenter
            HeaderCol.Strings = (
              ''
              #36215#28857
              #32456#28857
              #21462#20540
              #26041#27861)
            HeaderRow.Strings = (
              'X1'
              'X2'
              'X3'
              'X4'
              'X5'
              'X6'
              'X7'
              'X8'
              'X9'
              'X10')
            CanPaste = True
            ColWidths = (
              40
              49
              46
              51
              59)
          end
          object p421: TPanel
            Left = 1
            Top = 1
            Width = 302
            Height = 64
            Hint = #21452#20987#27492#22788#25152#26377#23792#33258#21160#23545#20013
            Align = alTop
            ParentShowHint = False
            ShowHint = False
            TabOrder = 1
            object Label3: TLabel
              Left = 8
              Top = 11
              Width = 30
              Height = 15
              Alignment = taRightJustify
              Caption = #23792#25968
            end
            object Label6: TLabel
              Left = 102
              Top = 11
              Width = 45
              Height = 15
              Alignment = taRightJustify
              Caption = #22522#20934#23792
            end
            object Label2: TLabel
              Left = 8
              Top = 40
              Width = 60
              Height = 15
              Alignment = taRightJustify
              Caption = #21462#23792#31639#27861
              Font.Charset = GB2312_CHARSET
              Font.Color = clNavy
              Font.Height = -15
              Font.Name = #23435#20307
              Font.Style = []
              ParentFont = False
            end
            object cbNum: TComboBox
              Left = 41
              Top = 6
              Width = 46
              Height = 24
              Style = csDropDownList
              Color = 14150640
              Font.Charset = GB2312_CHARSET
              Font.Color = clNavy
              Font.Height = -16
              Font.Name = #23435#20307
              Font.Style = []
              ItemHeight = 16
              ItemIndex = 0
              ParentFont = False
              TabOrder = 0
              Text = '2'
              OnClick = cbNumClick
              Items.Strings = (
                '2'
                '3'
                '4'
                '5'
                '6'
                '7'
                '8'
                '9'
                '10')
            end
            object btnSavePeak: TButton
              Left = 235
              Top = 14
              Width = 60
              Height = 32
              Caption = #20445#23384
              Font.Charset = GB2312_CHARSET
              Font.Color = clNavy
              Font.Height = -16
              Font.Name = #23435#20307
              Font.Style = []
              ParentFont = False
              TabOrder = 1
              OnClick = btnSavePeakClick
            end
            object cbBP: TComboBox
              Left = 153
              Top = 6
              Width = 46
              Height = 24
              Style = csDropDownList
              Color = 14150640
              Font.Charset = GB2312_CHARSET
              Font.Color = clNavy
              Font.Height = -16
              Font.Name = #23435#20307
              Font.Style = []
              ItemHeight = 16
              ParentFont = False
              TabOrder = 2
            end
            object cbPeakStyle: TComboBox
              Left = 70
              Top = 35
              Width = 156
              Height = 23
              Style = csDropDownList
              Color = 14150640
              Font.Charset = GB2312_CHARSET
              Font.Color = clNavy
              Font.Height = -15
              Font.Name = #23435#20307
              Font.Style = []
              ItemHeight = 15
              ParentFont = False
              TabOrder = 3
              OnClick = cbPeakStyleClick
            end
          end
        end
        object p41: TPanel
          Left = 0
          Top = 0
          Width = 304
          Height = 122
          Align = alTop
          BevelInner = bvRaised
          BevelOuter = bvLowered
          Color = 13684944
          TabOrder = 2
          OnDblClick = p41DblClick
          object Label4: TLabel
            Left = 4
            Top = 11
            Width = 60
            Height = 15
            Alignment = taRightJustify
            Caption = #21333#21345#27425#25968
            Font.Charset = GB2312_CHARSET
            Font.Color = clNavy
            Font.Height = -15
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
          end
          object Label1: TLabel
            Left = 34
            Top = 39
            Width = 30
            Height = 15
            Alignment = taRightJustify
            Caption = #38388#38548
          end
          object Label10: TLabel
            Left = 19
            Top = 68
            Width = 45
            Height = 15
            Alignment = taRightJustify
            Caption = #21345#25968#37327
            Font.Charset = GB2312_CHARSET
            Font.Color = clNavy
            Font.Height = -15
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
          end
          object Label11: TLabel
            Left = 34
            Top = 97
            Width = 30
            Height = 15
            Alignment = taRightJustify
            Caption = #38388#38548
          end
          object cbtAdd: TButton
            Left = 235
            Top = 38
            Width = 60
            Height = 33
            Caption = #21152#21345
            Enabled = False
            Font.Charset = GB2312_CHARSET
            Font.Color = clNavy
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 0
            OnClick = cbtAddClick
          end
          object cbThrow: TButton
            Tag = 1
            Left = 235
            Top = 77
            Width = 60
            Height = 33
            Caption = #20002#21345
            Enabled = False
            Font.Charset = GB2312_CHARSET
            Font.Color = clNavy
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 1
            OnClick = cbtAddClick
          end
          object cbtStop: TButton
            Tag = 4
            Left = 135
            Top = 72
            Width = 73
            Height = 35
            Caption = #20572#27490
            Enabled = False
            Font.Charset = GB2312_CHARSET
            Font.Color = clNavy
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 2
            Visible = False
            OnClick = cbtStopClick
          end
          object cbCount: TComboBox
            Left = 68
            Top = 7
            Width = 48
            Height = 24
            Color = 14150640
            Font.Charset = GB2312_CHARSET
            Font.Color = clNavy
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ItemHeight = 16
            ItemIndex = 0
            ParentFont = False
            TabOrder = 3
            Text = '1'
            Items.Strings = (
              '1'
              '2'
              '3'
              '4'
              '5'
              '6'
              '7'
              '8'
              '9'
              '10'
              '11'
              '12'
              '13'
              '14'
              '15'
              '16'
              '17'
              '18'
              '19'
              '20')
          end
          object cbtTest: TButton
            Tag = 3
            Left = 135
            Top = 72
            Width = 73
            Height = 35
            Caption = #35835#25968
            Enabled = False
            Font.Charset = GB2312_CHARSET
            Font.Color = clNavy
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ParentFont = False
            TabOrder = 4
            OnClick = cbtAddClick
          end
          object cbAutoThrow: TCheckBox
            Left = 129
            Top = 38
            Width = 80
            Height = 17
            BiDiMode = bdLeftToRight
            Caption = #33258#21160#20002#21345
            ParentBiDiMode = False
            TabOrder = 5
          end
          object cbDelay: TComboBox
            Left = 68
            Top = 35
            Width = 48
            Height = 23
            Style = csDropDownList
            Color = 14150640
            ItemHeight = 15
            ItemIndex = 1
            TabOrder = 6
            Text = '1'
            Items.Strings = (
              '0'
              '1'
              '2'
              '3'
              '4'
              '5'
              '6'
              '7'
              '8'
              '9'
              '10'
              '11'
              '12'
              '13'
              '14'
              '15'
              '20'
              '21'
              '22'
              '23'
              '24'
              '25'
              '26'
              '27'
              '28'
              '29'
              '30')
          end
          object cbRevers: TCheckBox
            Left = 128
            Top = 14
            Width = 82
            Height = 17
            Hint = #36873#20013#20026#33014#20307#37329#25968#25454#22788#29702#26041#24335
            Caption = #35835#25968#21453#36716
            TabOrder = 7
            OnClick = cbReversClick
          end
          object leCount: TLabeledEdit
            Left = 250
            Top = 6
            Width = 48
            Height = 23
            Color = 14737632
            EditLabel.Width = 30
            EditLabel.Height = 15
            EditLabel.Caption = #20010#25968
            LabelPosition = lpLeft
            LabelSpacing = 3
            TabOrder = 8
          end
          object cbCards: TComboBox
            Left = 68
            Top = 63
            Width = 48
            Height = 24
            Color = 14150640
            Font.Charset = GB2312_CHARSET
            Font.Color = clNavy
            Font.Height = -16
            Font.Name = #23435#20307
            Font.Style = []
            ItemHeight = 16
            ItemIndex = 0
            ParentFont = False
            TabOrder = 9
            Text = '1'
            Items.Strings = (
              '1'
              '2'
              '3'
              '4'
              '5'
              '6'
              '7'
              '8'
              '9'
              '10'
              '11'
              '12'
              '13'
              '14'
              '15'
              '16'
              '17'
              '18'
              '19'
              '20')
          end
          object cbCardDelay: TComboBox
            Left = 68
            Top = 92
            Width = 48
            Height = 23
            Color = 14150640
            ItemHeight = 15
            ItemIndex = 1
            TabOrder = 10
            Text = '1'
            Items.Strings = (
              '0'
              '1'
              '2'
              '3'
              '4'
              '5'
              '6'
              '7'
              '8'
              '9'
              '10'
              '11'
              '12'
              '13'
              '14'
              '15'
              '20'
              '21'
              '22'
              '23'
              '24'
              '25'
              '26'
              '27'
              '28'
              '29'
              '30')
          end
        end
        object p44: TPanel
          Left = 0
          Top = 459
          Width = 304
          Height = 129
          Align = alTop
          BevelOuter = bvLowered
          TabOrder = 1
          object fsgPPos: TFillStringGrid
            Left = 1
            Top = 33
            Width = 302
            Height = 95
            Align = alClient
            BorderStyle = bsNone
            Color = 14606046
            ColCount = 3
            DefaultColWidth = 48
            DefaultRowHeight = 22
            RowCount = 2
            ScrollBars = ssVertical
            TabOrder = 0
            OnClick = fsgPPosClick
            FixedFont = clNavy
            SelectBack = clNavy
            SelectText = clYellow
            AlignFixed = taCenter
            AlignCell = taCenter
            CanPaste = True
          end
          object p441: TPanel
            Left = 1
            Top = 1
            Width = 302
            Height = 32
            Align = alTop
            Alignment = taLeftJustify
            Caption = ' '#23792#20013#24515#20301#32622'('#21452#20987#33258#21160#35843#25972#23792#21306#38388#23450#20041')'
            TabOrder = 1
            OnDblClick = p441DblClick
          end
        end
        object p43: TPanel
          Left = 0
          Top = 280
          Width = 304
          Height = 179
          Align = alTop
          BevelOuter = bvLowered
          TabOrder = 3
          object p431: TPanel
            Left = 1
            Top = 1
            Width = 302
            Height = 38
            Align = alTop
            Alignment = taLeftJustify
            Caption = ' T/C'#35745#31639#26041#27861'('#21491#38190#28165#38500#25351#23450#34892')'
            Color = 13684944
            TabOrder = 0
            object btnSaveTC: TButton
              Left = 235
              Top = 3
              Width = 60
              Height = 32
              Caption = #20445#23384
              Font.Charset = GB2312_CHARSET
              Font.Color = clNavy
              Font.Height = -16
              Font.Name = #23435#20307
              Font.Style = []
              ParentFont = False
              TabOrder = 0
              Visible = False
              OnClick = btnSaveTCClick
            end
          end
          object fsgTC: TFillStringGrid
            Left = 1
            Top = 39
            Width = 302
            Height = 139
            Align = alClient
            BorderStyle = bsNone
            Color = 14737632
            DefaultColWidth = 44
            DefaultRowHeight = 22
            FixedColor = 13684944
            RowCount = 6
            Font.Charset = GB2312_CHARSET
            Font.Color = clNavy
            Font.Height = -15
            Font.Name = #23435#20307
            Font.Style = []
            Options = [goFixedVertLine, goFixedHorzLine, goVertLine, goHorzLine, goDrawFocusSelected, goRowSelect]
            ParentFont = False
            ScrollBars = ssNone
            TabOrder = 1
            OnDblClick = fsgTCDblClick
            OnKeyUp = fsgTCKeyUp
            OnMouseUp = fsgTCMouseUp
            FixedFont = clNavy
            SelectBack = clNavy
            SelectText = clYellow
            AlignFixed = taCenter
            AlignCell = taCenter
            HeaderCol.Strings = (
              ''
              'P1'
              'P2'
              'P3'
              #20844#24335)
            HeaderRow.Strings = (
              #39033#30446'1'
              #39033#30446'2'
              #39033#30446'3'
              #39033#30446'4'
              #39033#30446'5')
            CanPaste = True
            ColWidths = (
              44
              38
              41
              44
              129)
            RowHeights = (
              22
              22
              22
              22
              22
              22)
          end
        end
      end
    end
    object TabSheet2: TTabSheet
      Caption = 'X'#36724#33639#20809#35843#35797
      ImageIndex = 3
      object RespChart1: TRespChart
        Left = 0
        Top = 81
        Width = 998
        Height = 506
        CActiveLine = clRed
        CAxisLine = clGreen
        CAxisText = clNavy
        CCrossLine = clRed
        CDataBack = clTeal
        CDataText = clYellow
        CDataLine = clNavy
        CGridLine = clGray
        CLegendBack = clNavy
        CLegendText = clYellow
        CPeakDot = clRed
        BCross = True
        BRight = True
        BShowY = True
        BorderWidth = 10
        AxisXName = #24207#21495
        AxisYName = #27979#35797#20540
        Align = alClient
        Color = 14737632
        ParentColor = False
        Font.Charset = GB2312_CHARSET
        Font.Color = clNavy
        Font.Height = -12
        Font.Name = #23435#20307
        Font.Style = []
      end
      object Panel11: TPanel
        Left = 0
        Top = 0
        Width = 998
        Height = 81
        Align = alTop
        TabOrder = 1
        object Button20: TButton
          Tag = 3
          Left = 542
          Top = 22
          Width = 64
          Height = 35
          Caption = #27979#35797
          TabOrder = 0
          OnClick = Button20Click
        end
        object Button21: TButton
          Tag = 3
          Left = 254
          Top = 22
          Width = 99
          Height = 35
          Caption = #21021#22987#21270#30011#26495
          TabOrder = 1
          OnClick = Button21Click
        end
        object LabeledEdit4: TLabeledEdit
          Left = 86
          Top = 25
          Width = 58
          Height = 24
          Color = 14150640
          Ctl3D = True
          EditLabel.Width = 72
          EditLabel.Height = 16
          EditLabel.Caption = 'X'#31383#21475#38271#24230
          LabelPosition = lpLeft
          LabelSpacing = 3
          ParentCtl3D = False
          TabOrder = 2
          Text = '194'
        end
        object Button27: TButton
          Tag = 821
          Left = 164
          Top = 21
          Width = 69
          Height = 36
          Caption = #35835#31383#21475
          TabOrder = 3
          OnClick = cb51Click
        end
        object LabeledEdit6: TLabeledEdit
          Left = 470
          Top = 25
          Width = 58
          Height = 24
          Color = 14150640
          Ctl3D = True
          EditLabel.Width = 32
          EditLabel.Height = 16
          EditLabel.Caption = #24310#26102
          LabelPosition = lpLeft
          LabelSpacing = 3
          ParentCtl3D = False
          TabOrder = 4
          Text = '6000'
        end
      end
    end
  end
  object pQuit: TPanel
    Left = 552
    Top = 1
    Width = 513
    Height = 34
    Alignment = taLeftJustify
    BevelOuter = bvNone
    TabOrder = 1
    object cbClose: TCornerButton
      Tag = 2
      Left = 339
      Top = 1
      Width = 74
      Height = 31
      ColorFrom = clGreen
      ColorTo = clMoneyGreen
      ColorDFrom = clWhite
      ColorDTo = clMoneyGreen
      BorderColor = clGray
      TextShadowColor = clNavy
      CornerSize = 5
      Spacing = 0
      Color = clMoneyGreen
      Font.Charset = GB2312_CHARSET
      Font.Color = clWhite
      Font.Height = -15
      Font.Name = #23435#20307
      Font.Style = []
      Caption = #20851#38381#20018#21475
      OnClick = cbCloseClick
      ParentColor = False
      ParentFont = False
    end
    object cbOpen: TCornerButton
      Tag = 2
      Left = 427
      Top = 1
      Width = 74
      Height = 31
      ColorFrom = 16384
      ColorTo = clMoneyGreen
      ColorDFrom = clWhite
      ColorDTo = clMoneyGreen
      BorderColor = clGray
      TextShadowColor = clNavy
      CornerSize = 5
      Spacing = 0
      Color = clMoneyGreen
      Font.Charset = GB2312_CHARSET
      Font.Color = clWhite
      Font.Height = -15
      Font.Name = #23435#20307
      Font.Style = []
      Caption = #25171#24320#20018#21475
      OnClick = cbOpenClick
      ParentColor = False
      ParentFont = False
    end
    object ep: TErrorPanel
      Left = 0
      Top = 0
      Width = 289
      Height = 34
      Align = alLeft
      BevelOuter = bvLowered
      Caption = #20986#38169#20102#65281#65281#65281
      Color = clMaroon
      Font.Charset = GB2312_CHARSET
      Font.Color = clYellow
      Font.Height = -15
      Font.Name = #23435#20307
      Font.Style = []
      ParentFont = False
      TabOrder = 0
      Visible = False
      OnClick = epClick
      Interval = 500
      TxtColor = clYellow
    end
  end
  object Timer1: TTimer
    OnTimer = Timer1Timer
    Left = 336
    Top = 584
  end
  object odt: TOpenDialog
    Left = 688
    Top = 424
  end
  object CalcSDCV1: TCalcSDCV
    Left = 752
    Top = 424
  end
  object sdt: TSaveDialog
    DefaultExt = 'PAM'
    Filter = 'Excel File|.XLS|Text File|.TXT'
    Title = #20445#23384#27979#35797#25968#25454
    Left = 624
    Top = 424
  end
  object Timer2: TTimer
    Interval = 100
    OnTimer = Timer2Timer
    Left = 376
    Top = 584
  end
end
