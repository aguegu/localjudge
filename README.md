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

  Most Linux system should have `g++` and `make` preinstalled. `nodejs` enviroment is recommended to setup with [tj/n](https://github.com/tj/n).
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

  If you edited the source file, ` main.cpp` in this case, after saving it, you would see it got compiled success and failed. If compiled success, you would verify the tests input/output work or not.

  To quit `make watch`, type `CTRL-C`.

6. Once you are satisfied with solution, the content of `main.cpp` could be submit to the `online judge` platform to get its score.

  On Luogu, in the code submit form, the language option should be set to `C++11` would just work fine.

7. For a new problem to solve, just create a new folder, copy the `Makefile`, `readme.yaml` from the example folder within it. Then edit the `readme.yaml` with the question url and tests input/outputs, create a new `main.cpp` with your chosen editor. And get `make watch` started, you are good to go.

  My blog about this repo: https://aguegu.github.io/posts/localjudge/
  Discussion on Luogu Forum: https://www.luogu.com.cn/discuss/show/321053

  That's it. Happy Coding.


command: luogu
---

Thanks to this [unofficial api doc](https://sjx233.github.io/luogu-api-docs/) of luogu.com.cn. Another script named [luogu.mjs](src/luogu.mjs) is created to generate problem folder. It can also installed by `npm link`.

So go to the folder for problems, etc `cd examples`
then run command `luogu P1014`. `P1014` is the [problem id](https://www.luogu.com.cn/problem/P1014) on Luogu. Then a folder also named `P1014` is created with `main.cpp`, `readme.yaml`, `Makefile` in it. The `readme.yaml` got the sample tests filled. But you could always add more samples on you own.
