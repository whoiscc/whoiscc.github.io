from re import sub, MULTILINE
from glob import glob

for f in glob("**/*.html", recursive=True):
    with open(f, "r") as file:
        content = file.read()

    for origin, replacement in [
        (
            "//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css",
            "//cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css",
        ),
        (
            "//cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css",
            "//cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.css",
        ),
        (
            "//cdn.bootcss.com/highlight.js/9.12.0/styles/github.min.css",
            "//cdn.jsdelivr.net/npm/highlight.js@9.12.0/styles/github.min.css",
        ),
        (
            "//cdn.bootcss.com/jquery/3.2.1/jquery.min.js",
            "//cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js",
        ),
        (
            "//cdn.bootcss.com/geopattern/1.2.3/js/geopattern.min.js",
            "//github.com/btmills/geopattern/releases/download/v1.2.3/geopattern-1.2.3.min.js",
        ),
        (
            "//cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js",
            "//cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.js",
        ),
        (
            "//cdn.bootcss.com/mathjax/2.7.1/latest.js",
            "//cdn.jsdelivr.net/npm/mathjax@2.7.1/latest.js",
        ),
        (
            "//cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js",
            "//cdn.jsdelivr.net/npm/fastclick@1.0.6/lib/fastclick.min.js",
        ),
        (
            "//cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js",
            "//cdn.jsdelivr.net/npm/highlight.js@9.12.0/lib/highlight.min.js",
        ),
    ]:
        content = content.replace(origin, replacement)
    # print(content)
    # break
    with open(f, "w") as file:
        file.write(content)
    print(f)
