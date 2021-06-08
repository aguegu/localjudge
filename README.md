localjudge
===

`localjudge` is a local environment setup for `online judge`. It aims for easier and quicker development and debugging locally.

It provides a IDE free scaffold for `c++` solution for online judge platforms, like [luogu](https://www.luogu.com.cn), with a nodejs script and Makefiles, problem solvers could work out their solutions with their favorite editors on Linux or MacOS.




Getstarted
---

0. System prerequisites

  * make: command management
  * [entr](http://eradman.com/entrproject/): filesystem watcher
  * g++: the code compiler
  * nodejs (>=12.0): script runner

  Most Linux system should have g++ and make preinstalled. `nodejs` enviroment is recommended to setup with [tj/n](https://github.com/tj/n).
  ```
  $ sudo apt install entr g++ make
  ```

1. clone `localjudge`

```
$ git clone https://github.com/aguegu/localjudge.git
```

2. install dependencies

```
$ cd localjudge
$ npm i
```

3. install `localjudge` command, so you could access to `judge` command within your shell

```
$ npm link
```

4. Go to a example folder, like `examples/P1047`, it contains 3 files

  * `main.cpp` is the source code file you about to edit
  * `readme.yaml` is a file in [YAML](https://yaml.org/) format that contains some test data
  * `Makefile` contains the scripts that could help you run the code

5. Watch your source and got it compiled and tests run hot-reloaded.

```
 $ cd examples/P1047
 $ make watch
```

  if you edited the source file, ` main.cpp` in this case, after saving it, you would see it got compiled success and failed. If compiled success, you would verify the tests input/output work or not.
