warning: LF will be replaced by CRLF in client/package.json.
The file will have its original line endings in your working directory.
[1mdiff --git a/client/package-lock.json b/client/package-lock.json[m
[1mdeleted file mode 100644[m
[1mindex 8c31ff0..0000000[m
[1m--- a/client/package-lock.json[m
[1m+++ /dev/null[m
[36m@@ -1,20118 +0,0 @@[m
[31m-{[m
[31m-  "name": "atomic-coconut-client",[m
[31m-  "version": "0.0.0",[m
[31m-  "lockfileVersion": 1,[m
[31m-  "requires": true,[m
[31m-  "dependencies": {[m
[31m-    "@agm/core": {[m
[31m-      "version": "1.0.0-beta.5",[m
[31m-      "resolved": "https://registry.npmjs.org/@agm/core/-/core-1.0.0-beta.5.tgz",[m
[31m-      "integrity": "sha512-LVENJqtBZEWpX+uJkGI0zgg+Xkm2KkktQm4ojZozArbeNvQkVL6pqVc04Mme6vvOzwJpD1cET5w4byC8Xaq1QQ=="[m
[31m-    },[m
[31m-    "@angular-devkit/architect": {[m
[31m-      "version": "0.10.3",[m
[31m-      "resolved": "https://registry.npmjs.org/@angular-devkit/architect/-/architect-0.10.3.tgz",[m
[31m-      "integrity": "sha512-6isM3knVRsdS3RTh43cwgOpvp5EIm5OswQuimNru+7uP8qhOBDQdRTd/w/HthmHylKPsEFPqEo1l2KoZCCSwvw==",[m
[31m-      "dev": true,[m
[31m-      "requires": {[m
[31m-        "@angular-devkit/core": "7.0.3",[m
[31m-        "rxjs": "6.3.3"[m
[31m-      }[m
[31m-    },[m
[31m-    "@angular-devkit/build-angular": {[m
[31m-      "version": "0.10.3",[m
[31m-      "resolved": "https://registry.npmjs.org/@angular-devkit/build-angular/-/build-angular-0.10.3.tgz",[m
[31m-      "integrity": "sha512-gV/mLAckS1jaXfuAEaO7p9LqcMrVSmwC2ad85J/unJMqkkxTk7S9TgMe8/A3LIOJ1oZyIKniz/Q30JL092EqRA==",[m
[31m-      "dev": true,[m
[31m-      "requires": {[m
[31m-        "@angular-devkit/architect": "0.10.3",[m
[31m-        "@angular-devkit/build-optimizer": "0.10.3",[m
[31m-        "@angular-devkit/build-webpack": "0.10.3",[m
[31m-        "@angular-devkit/core": "7.0.3",[m
[31m-        "@ngtools/webpack": "7.0.3",[m
[31m-        "ajv": "6.5.3",[m
[31m-        "autoprefixer": "9.1.5",[m
[31m-        "circular-dependency-plugin": "5.0.2",[m
[31m-        "clean-css": "4.2.1",[m
[31m-        "copy-webpack-plugin": "4.5.4",[m
[31m-        "file-loader": "2.0.0",[m
[31m-        "glob": "7.1.3",[m
[31m-        "istanbul": "0.4.5",[m
[31m-        "istanbul-instrumenter-loader": "3.0.1",[m
[31m-        "karma-source-map-support": "1.3.0",[m
[31m-        "less": "3.8.1",[m
[31m-        "less-loader": "4.1.0",[m
[31m-        "license-webpack-plugin": "2.0.2",[m
[31m-        "loader-utils": "1.1.0",[m
[31m-        "mini-css-extract-plugin": "0.4.3",[m
[31m-        "minimatch": "3.0.4",[m
[31m-        "node-sass": "4.9.3",[m
[31m-        "opn": "5.3.0",[m
[31m-        "parse5": "4.0.0",[m
[31m-        "portfinder": "1.0.17",[m
[31m-        "postcss": "7.0.5",[m
[31m-        "postcss-import": "12.0.0",[m
[31m-        "postcss-loader": "3.0.0",[m
[31m-        "raw-loader": "0.5.1",[m
[31m-        "rxjs": "6.3.3",[m
[31m-        "sass-loader": "7.1.0",[m
[31m-        "semver": "5.5.1",[m
[31m-        "source-map-loader": "0.2.4",[m
[31m-        "source-map-support": "0.5.9",[m
[31m-        "speed-measure-webpack-plugin": "^1.2.3",[m
[31m-        "stats-webpack-plugin": "0.7.0",[m
[31m-        "style-loader": "0.23.0",[m
[31m-        "stylus": "0.54.5",[m
[31m-        "stylus-loader": "3.0.2",[m
[31m-        "terser-webpack-plugin": "1.1.0",[m
[31m-        "tree-kill": "1.2.0",[m
[31m-        "webpack": "4.19.1",[m
[31m-        "webpack-dev-middleware": "3.3.0",[m
[31m-        "webpack-dev-server": "3.1.8",[m
[31m-        "webpack-merge": "4.1.4",[m
[31m-        "webpack-sources": "1.2.0",[m
[31m-        "webpack-subresource-integrity": "1.1.0-rc.6"[m
[31m-      },[m
[31m-      "dependencies": {[m
[31m-        "glob": {[m
[31m-          "version": "7.1.3",[m
[31m-          "resolved": "https://registry.npmjs.org/glob/-/glob-7.1.3.tgz",[m
[31m-          "integrity": "sha512-vcfuiIxogLV4DlGBHIUOwI0IbrJ8HWPc4MU7HzviGeNho/UJDfi6B5p3sHeWIQ0KGIU0Jpxi5ZHxemQfLkkAwQ==",[m
[31m-          "dev": true,[m
[31m-          "requires": {[m
[31m-            "fs.realpath": "^1.0.0",[m
[31m-            "inflight": "^1.0.4",[m
[31m-            "inherits": "2",[m
[31m-            "minimatch": "^3.0.4",[m
[31m-            "once": "^1.3.0",[m
[31m-            "path-is-absolute": "^1.0.0"[m
[31m-          }[m
[31m-        },[m
[31m-        "parse5": {[m
[31m-          "version": "4.0.0",[m
[31m-          "resolved": "https://registry.npmjs.org/parse5/-/parse5-4.0.0.tgz",[m
[31m-          "integrity": "sha512-VrZ7eOd3T1Fk4XWNXMgiGBK/z0MG48BWG2uQNU4I72fkQuKUTZpl+u9k+CxEG0twMVzSmXEEz12z5Fnw1jIQFA==",[m
[31m-          "dev": true[m
[31m-        },[m
[31m-        "semver": {[m
[31m-          "version": "5.5.1",[m
[31m-          "resolved": "https://registry.npmjs.org/semver/-/semver-5.5.1.tgz",[m
[31m-          "integrity": "sha512-PqpAxfrEhlSUWge8dwIp4tZnQ25DIOthpiaHNIthsjEFQD6EvqUKUDM7L8O2rShkFccYo1VjJR0coWfNkCubRw==",[m
[31m-          "dev": true[m
[31m-        },[m
[31m-        "source-map": {[m
[31m-          "version": "0.6.1",[m
[31m-          "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",[m
[31m-          "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",[m
[31m-          "dev": true[m
[31m-        },[m
[31m-        "source-map-support": {[m
[31m-          "version": "0.5.9",[m
[31m-          "resolved": "https://registry.npmjs.org/source-map-support/-/source-map-support-0.5.9.tgz",[m
[31m-          "integrity": "sha512-gR6Rw4MvUlYy83vP0vxoVNzM6t8MUXqNuRsuBmBHQDu1Fh6X015FrLdgoDKcNdkwGubozq0P4N0Q37UyFVr1EA==",[m
[31m-          "dev": true,[m
[31m-          "requires": {[m
[31m-            "buffer-from": "^1.0.0",[m
[31m-            "source-map": "^0.6.0"[m
[31m-          }[m
[31m-        }[m
[31m-      }[m
[31m-    },[m
[31m-    "@angular-devkit/build-optimizer": {[m
[31m-      "version": "0.10.3",[m
[31m-      "resolved": "https://registry.npmjs.org/@angular-devkit/build-optimizer/-/build-optimizer-0.10.3.tgz",[m
[31m-      "integrity": "sha512-NgsS0kdUh/Op9+Kzbq0X6AsTV/BgpVtiF5UxZjdWVQgPPOdur5V9PkpRn9odey+06S/wDTE/UzPmT3qKXTQVHw==",[m
[31m-      "dev": true,[m
[31m-      "requires": {[m
[31m-        "loader-utils": "1.1.0",[m
[31m-        "source-map": "0.5.6",[m
[31m-        "typescript": "3.1.3",[m
[31m-        "webpack-sources": "1.2.0"[m
[31m-      }[m
[31m-    },[m
[31m-    "@angular-devkit/build-webpack": {[m
[31m-      "version": "0.10.3",[m
[31m-      "resolved": "https://registry.npmjs.org/@angular-devkit/build-webpack/-/build-webpack-0.10.3.tgz",[m
[31m-      "integrity": "sha512-2uZselfqpxnPbV9d2dRCgl4lJjD1xemNpRijxFIuxeXvadqTPkHA0YuUkX7CTajtwSWy3Cs69StL87b9gYFLSA==",[m
[31m-      "dev": true,[m
[31m-      "requires": {[m
[31m-        "@angular-devkit/architect": "0.10.3",[m
[31m-        "@angular-devkit/core": "7.0.3",[m
[31m-        "rxjs": "6.3.3"[m
[31m-      }[m
[31m-    },[m
[31m-    "@angular-devkit/core": {[m
[31m-      "version": "7.0.3",[m
[31m-      "resolved": "https://registry.npmjs.org/@angular-devkit/core/-/core-7.0.3.tgz",[m
[31m-      "integrity": "sha512-Yp0AhTuJbp0VwCHTmUOANrKZNQxTD/F49jPmSCBa/VMYMIoU/sUIiHVNdwzfcFnMoExGoXYah0kutBxgNIG3OA==",[m
[31m-      "dev": true,[m
[31m-      "requires": {[m
[31m-        "ajv": "6.5.3",[m
[31m-        "chokidar": "2.0.4",[m
[31m-        "fast-json-stable-stringify": "2.0.0",[m
[31m-        "rxjs": "6.3.3",[m
[31m-        "source-map": "0.7.3"[m
[31m-      },[m
[31m-      "dependencies": {[m
[31m-        "anymatch": {[m
[31m-          "version": "2.0.0",[m
[31m-          "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-2.0.0.tgz",[m
[31m-          "integrity": "sha512-5teOsQWABXHHBFP9y3skS5P3d/WfWXpv3FUpy+LorMrNYaT9pI4oLMQX7jzQ2KklNpGpWHzdCXTDT2Y3XGlZBw==",[m
[31m-          "dev": true,[m
[31m-          "requires": {[m
[31m-            "micromatch": "^3.1.4",[m
[31m-            "normalize-path": "^2.1.1"[m
[31m-          }[m
[31m-        },[m
[31m-        "arr-diff": {[m
[31m-          "version": "4.0.0",[m
[31m-          "resolved": "https://registry.npmjs.org/arr-diff/-/arr-diff-4.0.0.tgz",[m
[31m-          "integrity": "sha1-1kYQdP6/7HHn4VI1dhoyml3HxSA=",[m
[31m-          "dev": true[m
[31m-        },[m
[31m-        "array-unique": {[m
[31m-          "version": "0.3.2",[m
[31m-          "resolved": "https://registry.npmjs.org/array-unique/-/array-unique-0.3.2.tgz",[m
[31m-          "integrity": "sha1-qJS3XUvE9s1nnvMkSp/Y9Gri1Cg=",[m
[31m-          "dev": true[m
[31m-        },[m
[31m-        "braces": {[m
[31m-          "version": "2.3.2",[m
[31m-          "resolved": "https://registry.npmjs.org/braces/-/braces-2.3.2.tgz",[m
[31m-          "integrity": "sha512-aNdbnj9P8PjdXU4ybaWLK2IF3jc/EoDYbC7AazW6to3TRsfXxscC9UXOB5iDiEQrkyIbWp2SLQda4+QAa7nc3w==",[m
[31m-          "dev": true,[m
[31m-          "requires": {[m
[31m-            "arr-flatten": "^1.1.0",[m
[31m-            "array-unique": "^0.3.2",[m
[31m-            "extend-shallow": "^2.0.1",[m
[31m-            "fill-range": "^4.0.0",[m
[31m-            "isobject": "^3.0.1",[m
[31m-            "repeat-element": "^1.1.2",[m
[31m-            "snapdragon": "^0.8.1",[m
[31m-            "snapdragon-node": "^2.0.1",[m
[31m-            "split-string": "^3.0.2",[m
[31m-            "to-regex": "^3.0.1"[m
[31m-          },[m
[31m-          "dependencies": {[m
[31m-            "extend-shallow": {[m
[31m-              "version": "2.0.1",[m
[31m-              "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",[m
[31m-              "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",[m
[31m-              "dev": true,[m
[31m-              "requires": {[m
[31m-                "is-extendable": "^0.1.0"[m
[31m-              }[m
[31m-            }[m
[31m-          }[m
[31m-        },[m
[31m-        "chokidar": {[m
[31m-          "version": "2.0.4",[m
[31m-          "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-2.0.4.tgz",[m
[31m-          "integrity": "sha512-z9n7yt9rOvIJrMhvDtDictKrkFHeihkNl6uWMmZlmL6tJtX9Cs+87oK+teBx+JIgzvbX3yZHT3eF8vpbDxHJXQ==",[m
[31m-          "dev": true,[m
[31m-          "requires": {[m
[31m-            "anymatch": "^2.0.0",[m
[31m-            "async-each": "^1.0.0",[m
[31m-            "braces": "^2.3.0",[m
[31m-            "fsevents": "^1.2.2",[m
[31m-            "glob-parent": "^3.1.0",[m
[31m-            "inherits": "^2.0.1",[m
[31m-            "is-binary-path": "^1.0.0",[m
[31m-            "is-glob": "^4.0.0",[m
[31m-            "lodash.debounce": "^4.0.8",[m
[31m-            "normalize-path": "^2.1.1",[m
[31m-            "path-is-absolute": "^1.0.0",[m
[31m-            "readdirp": "^2.0.0",[m
[31m-            "upath": "^1.0.5"[m
[31m-          }[m
[31m-        },[m
[31m-        "expand-brackets": {[m
[31m-          "version": "2.1.4",[m
[31m-          "resolved": "https://registry.npmjs.org/expand-brackets/-/expand-brackets-2.1.4.tgz",[m
[31m-          "integrity": "sha1-t3c14xXOMPa27/D4OwQVGiJEliI=",[m
[31m-          "dev": true,[m
[31m-          "requires": {[m
[31m-            "debug": "^2.3.3",[m
[31m-            "define-property": "^0.2.5",[m
[31m-            "extend-shallow": "^2.0.1",[m
[31m-            "posix-character-classes": "^0.1.0",[m
[31m-            "regex-not": "^1.0.0",[m
[31m-            "snapdragon": "^0.8.1",[m
[31m-            "to-regex": "^3.0.1"[m
[31m-          },[m
[31m-          "dependencies": {[m
[31m-            "define-property": {[m
[31m-              "version": "0.2.5",[m
[31m-              "resolved": "https://registry.npmjs.org/define-property/-/define-property-0.2.5.tgz",[m
[31m-              "integrity": "sha1-w1se+RjsPJkPmlvFe+BKrOxcgRY=",[m
[31m-              "dev": true,[m
[31m-              "requires": {[m
[31m-                "is-descriptor": "^0.1.0"[m
[31m-              }[m
[31m-            },[m
[31m-            "extend-shallow": {[m
[31m-              "version": "2.0.1",[m
[31m-              "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",[m
[31m-              "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",[m
[31m-              "dev": true,[m
[31m-              "requires": {[m
[31m-                "is-extendable": "^0.1.0"[m
[31m-              }[m
[31m-            },[m
[31m-            "is-accessor-descriptor": {[m
[31m-              "version": "0.1.6",[m
[31m-              "resolved": "https://registry.npmjs.org/is-accessor-descriptor/-/is-accessor-descriptor-0.1.6.tgz",[m
[31m-              "integrity": "sha1-qeEss66Nh2cn7u84Q/igiXtcmNY=",[m
[31m-              "dev": true,[m
[31m-              "requires": {[m
[31m-                "kind-of": "^3.0.2"[m
[31m-              },[m
[31m-              "dependencies": {[m
[31m-                "kind-of": {[m
[31m-                  "version": "3.2.2",[m
[31m-                  "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",[m
[31m-                  "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",[m
[31m-                  "dev": true,[m
[31m-                  "requires": {[m
[31m-                    "is-buffer": "^1.1.5"[m
[31m-                  }[m
[31m-                }[m
[31m-              }[m
[31m-            },[m
[31m-            "is-data-descriptor": {[m
[31m-              "version": "0.1.4",[m
[31m-              "resolved": "https://registry.npmjs.org/is-data-descriptor/-/is-data-descriptor-0.1.4.tgz",[m
[31m-              "integrity": "sha1-C17mSDiOLIYCgueT8YVv7D8wG1Y=",[m
[31m-              "dev": true,[m
[31m-              "requires": {[m
[31m-                "kind-of": "^3.0.2"[m
[31m-              },[m
[31m-              "dependencies": {[m
[31m-                "kind-of": {[m
[31m-                  "version": "3.2.2",[m
[31m-                  "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-3.2.2.tgz",[m
[31m-                  "integrity": "sha1-MeohpzS6ubuw8yRm2JOupR5KPGQ=",[m
[31m-                  "dev": true,[m
[31m-                  "requires": {[m
[31m-                    "is-buffer": "^1.1.5"[m
[31m-                  }[m
[31m-                }[m
[31m-              }[m
[31m-            },[m
[31m-            "is-descriptor": {[m
[31m-              "version": "0.1.6",[m
[31m-              "resolved": "https://registry.npmjs.org/is-descriptor/-/is-descriptor-0.1.6.tgz",[m
[31m-              "integrity": "sha512-avDYr0SB3DwO9zsMov0gKCESFYqCnE4hq/4z3TdUlukEy5t9C0YRq7HLrsN52NAcqXKaepeCD0n+B0arnVG3Hg==",[m
[31m-              "dev": true,[m
[31m-              "requires": {[m
[31m-                "is-accessor-descriptor": "^0.1.6",[m
[31m-                "is-data-descriptor": "^0.1.4",[m
[31m-                "kind-of": "^5.0.0"[m
[31m-              }[m
[31m-            },[m
[31m-            "kind-of": {[m
[31m-              "version": "5.1.0",[m
[31m-              "resolved": "https://registry.npmjs.org/kind-of/-/kind-of-5.1.0.tgz",[m
[31m-              "integrity": "sha512-NGEErnH6F2vUuXDh+OlbcKW7/wOcfdRHaZ7VWtqCztfHri/++YKmP51OdWeGPuqCOba6kk2OTe5d02VmTB80Pw==",[m
[31m-              "dev": true[m
[31m-            }[m
[31m-          }[m
[31m-        },[m
[31m-        "extglob": {[m
[31m-          "version": "2.0.4",[m
[31m-          "resolved": "https://registry.npmjs.org/extglob/-/extglob-2.0.4.tgz",[m
[31m-          "integrity": "sha512-Nmb6QXkELsuBr24CJSkilo6UHHgbekK5UiZgfE6UHD3Eb27YC6oD+bhcT+tJ6cl8dmsgdQxnWlcry8ksBIBLpw==",[m
[31m-          "dev": true,[m
[31m-          "requires": {[m
[31m-            "array-unique": "^0.3.2",[m
[31m-            "define-property": "^1.0.0",[m
[31m-            "expand-brackets": "^2.1.4",[m
[31m-            "extend-shallow": "^2.0.1",[m
[31m-            "fragment-cache": "^0.2.1",[m
[31m-            "regex-not": "^1.0.0",[m
[31m-            "snapdragon": "^0.8.1",[m
[31m-            "to-regex": "^3.0.1"[m
[31m-          },[m
[31m-          "dependencies": {[m
[31m-            "define-property": {[m
[31m-              "version": "1.0.0",[m
[31m-              "resolved": "https://registry.npmjs.org/define-property/-/define-property-1.0.0.tgz",[m
[31m-              "integrity": "sha1-dp66rz9KY6rTr56NMEybvnm/sOY=",[m
[31m-              "dev": true,[m
[31m-              "requires": {[m
[31m-                "is-descriptor": "^1.0.0"[m
[31m-              }[m
[31m-            },[m
[31m-            "extend-shallow": {[m
[31m-              "version": "2.0.1",[m
[31m-              "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",[m
[31m-              "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",[m
[31m-              "dev": true,[m
[31m-              "requires": {[m
[31m-                "is-extendable": "^0.1.0"[m
[31m-              }[m
[31m-            }[m
[31m-          }[m
[31m-        },[m
[31m-        "fill-range": {[m
[31m-          "version": "4.0.0",[m
[31m-          "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-4.0.0.tgz",[m
[31m-          "integrity": "sha1-1USBHUKPmOsGpj3EAtJAPDKMOPc=",[m
[31m-          "dev": true,[m
[31m-          "requires": {[m
[31m-            "extend-shallow": "^2.0.1",[m
[31m-            "is-number": "^3.0.0",[m
[31m-            "repeat-string": "^1.6.1",[m
[31m-            "to-regex-range": "^2.1.0"[m
[31m-          },[m
[31m-          "dependencies": {[m
[31m-            "extend-shallow": {[m
[31m-              "version": "2.0.1",[m
[31m-              "resolved": "https://registry.npmjs.org/extend-shallow/-/extend-shallow-2.0.1.tgz",[m
[31m-              "integrity": "sha1-Ua99YUrZqfYQ6huvu5idaxxWiQ8=",[m
[31m-              "dev": true,[m
[31m-              "requires": {[m
[31m-                "is-extendable": "^0.1.0"[m
[31m-              }[m
[31m-            }[m
[31m-          }[m
[31m-        },[m
[31m-        "fsevents": {[m
[31m-          "version": "1.2.4",[m
[31m-          "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-1.2.4.tgz",[m
[31m-          "integrity": "sha512-z8H8/diyk76B7q5wg+Ud0+CqzcAF3mBBI/bA5ne5zrRUUIvNkJY//D3BqyH571KuAC4Nr7Rw7CjWX4r0y9DvNg==",[m
[31m-          "dev": true,[m
[31m-          "optional": true,[m
[31m-          "requires": {[m
[31m-            "nan": "^2.9.2",[m
[31m-            "node-pre-gyp": "^0.10.0"[m
[31m-          },[m
[31m-          "dependencies": {[m
[31m-            "abbrev": {[m
[31m-              "version": "1.1.1",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true[m
[31m-            },[m
[31m-            "ansi-regex": {[m
[31m-              "version": "2.1.1",[m
[31m-              "bundled": true,[m
[31m-              "dev": true[m
[31m-            },[m
[31m-            "aproba": {[m
[31m-              "version": "1.2.0",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true[m
[31m-            },[m
[31m-            "are-we-there-yet": {[m
[31m-              "version": "1.1.4",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true,[m
[31m-              "requires": {[m
[31m-                "delegates": "^1.0.0",[m
[31m-                "readable-stream": "^2.0.6"[m
[31m-              }[m
[31m-            },[m
[31m-            "balanced-match": {[m
[31m-              "version": "1.0.0",[m
[31m-              "bundled": true,[m
[31m-              "dev": true[m
[31m-            },[m
[31m-            "brace-expansion": {[m
[31m-              "version": "1.1.11",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "requires": {[m
[31m-                "balanced-match": "^1.0.0",[m
[31m-                "concat-map": "0.0.1"[m
[31m-              }[m
[31m-            },[m
[31m-            "chownr": {[m
[31m-              "version": "1.0.1",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true[m
[31m-            },[m
[31m-            "code-point-at": {[m
[31m-              "version": "1.1.0",[m
[31m-              "bundled": true,[m
[31m-              "dev": true[m
[31m-            },[m
[31m-            "concat-map": {[m
[31m-              "version": "0.0.1",[m
[31m-              "bundled": true,[m
[31m-              "dev": true[m
[31m-            },[m
[31m-            "console-control-strings": {[m
[31m-              "version": "1.1.0",[m
[31m-              "bundled": true,[m
[31m-              "dev": true[m
[31m-            },[m
[31m-            "core-util-is": {[m
[31m-              "version": "1.0.2",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true[m
[31m-            },[m
[31m-            "debug": {[m
[31m-              "version": "2.6.9",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true,[m
[31m-              "requires": {[m
[31m-                "ms": "2.0.0"[m
[31m-              }[m
[31m-            },[m
[31m-            "deep-extend": {[m
[31m-              "version": "0.5.1",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true[m
[31m-            },[m
[31m-            "delegates": {[m
[31m-              "version": "1.0.0",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true[m
[31m-            },[m
[31m-            "detect-libc": {[m
[31m-              "version": "1.0.3",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true[m
[31m-            },[m
[31m-            "fs-minipass": {[m
[31m-              "version": "1.2.5",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true,[m
[31m-              "requires": {[m
[31m-                "minipass": "^2.2.1"[m
[31m-              }[m
[31m-            },[m
[31m-            "fs.realpath": {[m
[31m-              "version": "1.0.0",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true[m
[31m-            },[m
[31m-            "gauge": {[m
[31m-              "version": "2.7.4",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true,[m
[31m-              "requires": {[m
[31m-                "aproba": "^1.0.3",[m
[31m-                "console-control-strings": "^1.0.0",[m
[31m-                "has-unicode": "^2.0.0",[m
[31m-                "object-assign": "^4.1.0",[m
[31m-                "signal-exit": "^3.0.0",[m
[31m-                "string-width": "^1.0.1",[m
[31m-                "strip-ansi": "^3.0.1",[m
[31m-                "wide-align": "^1.1.0"[m
[31m-              }[m
[31m-            },[m
[31m-            "glob": {[m
[31m-              "version": "7.1.2",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true,[m
[31m-              "requires": {[m
[31m-                "fs.realpath": "^1.0.0",[m
[31m-                "inflight": "^1.0.4",[m
[31m-                "inherits": "2",[m
[31m-                "minimatch": "^3.0.4",[m
[31m-                "once": "^1.3.0",[m
[31m-                "path-is-absolute": "^1.0.0"[m
[31m-              }[m
[31m-            },[m
[31m-            "has-unicode": {[m
[31m-              "version": "2.0.1",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true[m
[31m-            },[m
[31m-            "iconv-lite": {[m
[31m-              "version": "0.4.21",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true,[m
[31m-              "requires": {[m
[31m-                "safer-buffer": "^2.1.0"[m
[31m-              }[m
[31m-            },[m
[31m-            "ignore-walk": {[m
[31m-              "version": "3.0.1",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true,[m
[31m-              "requires": {[m
[31m-                "minimatch": "^3.0.4"[m
[31m-              }[m
[31m-            },[m
[31m-            "inflight": {[m
[31m-              "version": "1.0.6",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true,[m
[31m-              "requires": {[m
[31m-                "once": "^1.3.0",[m
[31m-                "wrappy": "1"[m
[31m-              }[m
[31m-            },[m
[31m-            "inherits": {[m
[31m-              "version": "2.0.3",[m
[31m-              "bundled": true,[m
[31m-              "dev": true[m
[31m-            },[m
[31m-            "ini": {[m
[31m-              "version": "1.3.5",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true[m
[31m-            },[m
[31m-            "is-fullwidth-code-point": {[m
[31m-              "version": "1.0.0",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "requires": {[m
[31m-                "number-is-nan": "^1.0.0"[m
[31m-              }[m
[31m-            },[m
[31m-            "isarray": {[m
[31m-              "version": "1.0.0",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true[m
[31m-            },[m
[31m-            "minimatch": {[m
[31m-              "version": "3.0.4",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "requires": {[m
[31m-                "brace-expansion": "^1.1.7"[m
[31m-              }[m
[31m-            },[m
[31m-            "minimist": {[m
[31m-              "version": "0.0.8",[m
[31m-              "bundled": true,[m
[31m-              "dev": true[m
[31m-            },[m
[31m-            "minipass": {[m
[31m-              "version": "2.2.4",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "requires": {[m
[31m-                "safe-buffer": "^5.1.1",[m
[31m-                "yallist": "^3.0.0"[m
[31m-              }[m
[31m-            },[m
[31m-            "minizlib": {[m
[31m-              "version": "1.1.0",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true,[m
[31m-              "requires": {[m
[31m-                "minipass": "^2.2.1"[m
[31m-              }[m
[31m-            },[m
[31m-            "mkdirp": {[m
[31m-              "version": "0.5.1",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "requires": {[m
[31m-                "minimist": "0.0.8"[m
[31m-              }[m
[31m-            },[m
[31m-            "ms": {[m
[31m-              "version": "2.0.0",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true[m
[31m-            },[m
[31m-            "needle": {[m
[31m-              "version": "2.2.0",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true,[m
[31m-              "requires": {[m
[31m-                "debug": "^2.1.2",[m
[31m-                "iconv-lite": "^0.4.4",[m
[31m-                "sax": "^1.2.4"[m
[31m-              }[m
[31m-            },[m
[31m-            "node-pre-gyp": {[m
[31m-              "version": "0.10.0",[m
[31m-              "bundled": true,[m
[31m-              "dev": true,[m
[31m-              "optional": true,[m
[31m-              "requires": {[m
[31m-                "detect-libc": "^1.0.2",[m
[31