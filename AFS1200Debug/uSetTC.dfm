object frmSetTC: TfrmSetTC
  Left = 324
  Top = 100
  BorderIcons = []
  BorderStyle = bsSingle
  Caption = 'frmSetTC'
  ClientHeight = 183
  ClientWidth = 337
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -16
  Font.Name = #23435#20307
  Font.Style = []
  OldCreateOrder = False
  Position = poOwnerFormCenter
  OnShow = FormShow
  PixelsPerInch = 96
  TextHeight = 16
  object Label9: TLabel
    Left = 221
    Top = 19
    Width = 16
    Height = 16
    Caption = 'P3'
  end
  object Label8: TLabel
    Left = 126
    Top = 19
    Width = 16
    Height = 16
    Caption = 'P2'
  end
  object Label7: TLabel
    Left = 38
    Top = 19
    Width = 16
    Height = 16
    Caption = 'P1'
  end
  object Label6: TLabel
    Left = 8
    Top = 55
    Width = 132
    Height = 16
    Alignment = taRightJustify
    AutoSize = False
    Caption = #21453#24212#20540#35745#31639#26041#27861
    Font.Charset = DEFAULT_CHARSET
    Font.Color = clWindowText
    Font.Height = -13
    Font.Name = 'MS Sans Serif'
    Font.Style = []
    ParentFont = False
  end
  object c4: TComboBox
    Tag = 4
    Left = 145
    Top = 51
    Width = 149
    Height = 24
    Style = csDropDownList
    Color = 14150640
    ItemHeight = 16
    TabOrder = 0
    Items.Strings = (
      '0: X1/X2'
      '1: X1'
      '2: X1+X2'
      '3: X1+X2+X3'
      '4: (X1+X2)/X3'
      '5: X1/(X1+X2+X3)'
      '6: X1/(X1+X2)')
  end
  object c3: TComboBox
    Left = 240
    Top = 15
    Width = 54
    Height = 24
    Style = csDropDownList
    Color = 14150640
    ItemHeight = 16
    TabOrder = 1
    OnChange = c1Change
  end
  object c2: TComboBox
    Left = 145
    Top = 15
    Width = 54
    Height = 24
    Style = csDropDownList
    Color = 14150640
    ItemHeight = 16
    TabOrder = 2
    OnChange = c1Change
  end
  object c1: TComboBox
    Left = 57
    Top = 15
    Width = 54
    Height = 24
    Style = csDropDownList
    Color = 14150640
    ItemHeight = 16
    TabOrder = 3
    OnChange = c1Change
  end
  object btnOk: TButton
    Left = 144
    Top = 120
    Width = 75
    Height = 33
    Caption = #30830#23450
    TabOrder = 4
    OnClick = btnOkClick
  end
  object btnCancel: TButton
    Left = 240
    Top = 120
    Width = 75
    Height = 33
    Caption = #21462#28040
    TabOrder = 5
    OnClick = btnCancelClick
  end
  object btnClear: TButton
    Left = 40
    Top = 120
    Width = 75
    Height = 33
    Caption = #28165#38500
    TabOrder = 6
    OnClick = btnClearClick
  end
end
