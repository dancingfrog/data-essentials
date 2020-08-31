if (!require("reticulate")) {
  install.packages("reticulate")
  library("reticulate")
}

reticulate::source_python("start-jupyter.py")
