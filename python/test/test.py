msg = 'Hello python'
print(msg)

fruits = ['banana', 'apple',  'mango']
for fruit in fruits: 
  print(fruit)
print(1 in fruits)
print(4 not in fruits)

list = {'name': '灿神', 'age': '18', 'win': '18'}
for key, value in list.items():
    txt = "dict value name: " + str(value) + ' dict key name : ' + str(key)
    print(txt)
for value in list.keys():
    txt = "dict key: " + str(value)
    print(txt)
for value in list.values():
    txt = "dict value: " + str(value)
    print(txt)
for value in set(list.values()):
    txt = "dict value by set(): " + str(value)
    print(txt)

# 文件逐行读取，并去掉空格制表符等
def open_file():
  filename = '.gitignore'
  with open(filename) as file_object:
    for line in file_object:
      print(line.strip())
open_file()

# 写入文件
def new_file():
  filename = 'test.txt'
  with open(filename, 'w') as file_object:
    file_object.write('hahm,hello world, python test')
new_file()

# 附加文件
def add_content_to_file():
  filename = 'test.txt'
  with open(filename, 'a') as file_object:
    file_object.write('\n and i like code')
add_content_to_file()

# 处理 文件异常
def err_file():
  try:
    print(5/0)
  except ZeroDivisionError:
    print("You can't divide by zero!")
  try:
    filename = 'tests.txt'
    with open(filename) as file_object:
      for line in file_object:
        print(line.strip())
  except FileNotFoundError:
    msg = "Sorry, the file " + filename + " does not exist."
    print(msg)
err_file()
