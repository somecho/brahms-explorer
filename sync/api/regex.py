# regex expressions get their own file because
# some character sequences interfere with nvim's treesitter

seconds = "(\d*)\ss\W"
minutes = "(\d*)\smn"
year = "\((?:\d{4}-?(?:, )?)+\)"
subtitle = "^\s\s(.*)\(\d"
