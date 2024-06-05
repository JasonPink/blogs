### 发布静态资源到指定服务器

```
import { exec } from "child_process";
import ssh from "ssh2";
import { resolve } from "path";
import fs from "fs";
import archiver from "archiver";
import ora from "ora";
import chalk from "chalk";

const spinner = ora(chalk.blue("正在发布到测试服务器..."));

function zipDirectory(source, out) {
	const archive = archiver("zip", { zlib: { level: 9 } });
	const stream = fs.createWriteStream(out);

	return new Promise((resolve, reject) => {
		archive
			.directory(source, false)
			.on("error", err => reject(err))
			.pipe(stream);

		stream.on("close", () => resolve());
		archive.finalize();
	});
}

function uploadToServer(config, localPath, remotePath) {
	return new Promise((resolve, reject) => {
		const conn = new ssh.Client();

		conn
			.on("ready", () => {
				console.log(chalk.green("\n服务器已连接"));
				conn.sftp((err, sftp) => {
					if (err) {
						reject(err);
					} else {
						const readStream = fs.createReadStream(localPath);
						const writeStream = sftp.createWriteStream(remotePath);

						writeStream.on("close", () => {
							conn.end();
							resolve();
						});

						writeStream.on("end", () => {
							console.log("SFTP connection closed");
						});

						readStream.pipe(writeStream);
					}
				});
			})
			.connect(config);
	});
}

function unzipOnServer(config, remotePath, remoteDir) {
	return new Promise((resolve, reject) => {
		const conn = new ssh.Client();
		conn
			.on("ready", () => {
				conn.exec(`unzip -o ${remotePath} -d ${remoteDir}`, (err, stream) => {
					if (err) {
						reject(err);
					} else {
						stream
							.on("close", (code, signal) => {
								if (code === 0) {
									resolve();
								} else {
									reject(new Error(`Unzip failed with code ${code}`));
								}

								conn.end();
							})
							.stderr.on("data", data => {
								console.error(`Unzip error: ${data}`);
							});
					}
				});
			})
			.connect(config);
	});
}

async function deploy() {
	const config = {
		host: "",
		port: 22,
		username: "",
		password: ""
	};

	const localDistPath = resolve("dist");
	const localZipPath = `${localDistPath}.zip`;
	const remoteZipPath = "/home/zm-energy/front/jt-energy-efficiency/dist.zip";
	const remoteUnzipDir = "/home/zm-energy/front/jt-energy-efficiency/dist";

	try {
		await zipDirectory(localDistPath, localZipPath);
		spinner.start();
		await uploadToServer(config, localZipPath, remoteZipPath);
		await unzipOnServer(config, remoteZipPath, remoteUnzipDir);
		spinner.stop();
		console.log(chalk.green("Success! 成功发布到测试服务器! \n"));
	} catch (error) {
		console.log(chalk.red(`发布失败: ${error}`));
	}
}

deploy();

```

### 发布静态资源到七牛云

```
const fs = require("fs");
const path = require("path");

const chalk = require("chalk");
const ora = require("ora");
const Qiniu = require("qiniu");

const spinner = ora("upload files...");

const log = console.log;

const bucket = "91-web";

const getDir = () => {
  const env = process.argv[2];
  return (
    {
      dev: "ios-dev",
      prod: "ios-web",
    }[env] || "ios-dev"
  );
};
const dir = getDir();

const accessKey = "bJbXP3QsAX3nvcDsDYK990fcmSOKHO6T8i6fwxwS";
const secretKey = "heJLtWqCsRNfxGCmWZo2zN66In8yQj_wZsLoGp1A";

const mac = new Qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
  scope: bucket,
};
var putPolicy = new Qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);

const formUploader = new Qiniu.form_up.FormUploader(Qiniu.conf);
const extra = new Qiniu.form_up.PutExtra();

function readFiles(dir, paths = []) {
  const files = fs.readdirSync(dir);

  files.forEach((filename) => {
    const fullPath = path.join(dir, filename);

    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      readFiles(path.join(dir, filename), paths);
    } else {
      paths.push(fullPath);
    }
  });
}

const paths = [];
readFiles(path.join(__dirname, "..", "dist"), paths);

const promises = [];
const htmlPromises = [];
paths.forEach((path) => {
  const serverFileName = `${dir}/` + path.split("/dist/")[1];
  const localFile = path;

  const p = new Promise(function (resolve, reject) {
    formUploader.putFile(
      uploadToken,
      serverFileName,
      localFile,
      extra,
      (respErr, respInfo) => {
        if (respErr) {
          reject(path.split("/dist/")[1] + ": " + respErr);
        } else {
          resolve(
            `upload success: 域名/${dir}/` + respInfo.key,
          );
        }
      },
    );
  });

  if (path.includes(".html")) {
    // htmlPromises.push(p);
  } else {
    promises.push(p);
  }
});

const uploadHtml = async () => {
  const options = {
    scope: bucket + ":" + `${dir}/index.html`,
  };

  var putPolicy = new Qiniu.rs.PutPolicy(options);
  var uploadToken = putPolicy.uploadToken(mac);

  return new Promise((resolve, reject) => {
    formUploader.putFile(
      uploadToken,
      `${dir}/index.html`,
      path.join(__dirname, "..", "dist/index.html"),
      extra,
      (respErr) => {
        if (respErr) {
          reject("index.html");
        } else {
          resolve();
        }
      },
    );
  });
};

spinner.start();
Promise.all(promises)
  .then(async () => {
    try {
      await uploadHtml();
    } catch (err) {
      console.log("~~~err", err);
    }
    Promise.all(htmlPromises)
      .then(() => {
        spinner.stop();
        log(chalk.black.bgGreen(" DONE "), "Upload files successfully.");
        log(
          chalk.black.bgBlue(" PREVIEW "),
          chalk.blue(`域名/${dir}/index.html`),
        );
      })
      .catch(function (err) {
        spinner.stop();
        log(chalk.red(err));
      });
  })
  .catch(function (err) {
    spinner.stop();
    log(chalk.red(err));
  });
```

### 发布静态资源到阿里云

```
const OSS = require('aliyun-oss')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const ora = require('ora')

const spinner = ora('upload files...')

const log = console.log

const option = require('./oss')

option.bucket =
  process.argv[2] === 'prod'
    ? 'dongchamao-www'
    : process.argv[2] === 'stage'
    ? 'dongchamao-www-stage'
    : 'dongchamao-www-test'

const oss = OSS.createClient(option)

let OSS_DIR_NAME = 'web/'

if (process.argv[3]) {
  OSS_DIR_NAME = process.argv[3]
}

function readFiles(dir, paths = []) {
  const files = fs.readdirSync(dir)

  files.forEach(filename => {
    const fullPath = path.join(dir, filename)

    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      readFiles(path.join(dir, filename), paths)
    } else {
      paths.push(fullPath)
    }
  })
}

const paths = []
readFiles(path.join(__dirname, '..', 'dist'), paths)

const promises = []
paths.forEach(path => {
  const p = new Promise(function (resolve, reject) {
    const o = {
      bucket: option.bucket,
      object: OSS_DIR_NAME + path.split('/dist/')[1],
      source: path
    }

    oss.putObject(o, (err, res) => {
      if (err) {
        reject(path.split('/dist/')[1] + ': ' + err)
      } else {
        resolve('upload success: ' + res.objectUrl)
      }
    })
  })

  promises.push(p)
})

spinner.start()
Promise.all(promises)
  .then(() => {
    spinner.stop()
    log(chalk.black.bgGreen(' DONE '), 'Upload files successfully.')
    log(
      chalk.black.bgBlue(' PREVIEW '),
      chalk.blue(`https://${option.bucket}.oss-cn-hangzhou.aliyuncs.com/${OSS_DIR_NAME}index.html`)
    )
  })
  .catch(function (err) {
    spinner.stop()
    log(chalk.red(err))
  })
```
