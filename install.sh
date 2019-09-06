unset PYTHONPATH

conda update -y -c defaults conda
#conda install -f -y -q -n py37 -c conda-forge --file requirements.txt
#conda install --force-reinstall -y conda-build

# Install R
#conda update -y -c rdonnellyr -c main --all
#conda install --force-reinstall -y -c rdonnellyr r-base
#conda install --force-reinstall -y -c rdonnellyr _r-mutex r-assertthat r-base64enc r-bh r-bitops r-boot r-car r-caret r-catools r-chron r-class r-cluster r-codetools r-colorspace r-crayon r-curl r-data.table r-dbi r-dichromat r-digest r-doparallel r-dplyr r-essentials r-evaluate r-foreach r-foreign r-formatr r-ggplot2 r-gistr r-glmnet r-gridbase r-gtable r-hexbin r-highr r-htmltools r-htmlwidgets r-httpuv r-httr r-igraph r-irdisplay r-irkernel r-irlba r-iterators r-jsonlite r-kernsmooth r-knitr r-labeling r-lattice r-lazyeval r-lme4 r-magrittr r-maps r-markdown r-mass r-matrix r-matrixmodels r-memoise r-mgcv r-mime r-minqa r-munsell r-nlme r-nloptr r-nmf r-nnet r-openssl r-pbdzmq r-pbkrtest r-pkgmaker r-plyr r-pryr r-quantmod r-quantreg r-r6 r-randomforest r-rbokeh r-rcolorbrewer r-rcpp r-rcppeigen r-recommended r-registry r-repr r-reshape2 r-rmarkdown r-rngtools r-rpart r-scales r-shiny r-sparsem r-spatial r-stringi r-stringr r-survival r-tibble r-tidyr r-ttr r-uuid r-xtable r-xts r-yaml r-zoo
# Update R profile
export rprofile="$(echo $(r  -f example.r  | grep '/Rprofile') | grep -o '[A-Z|a-z|\/][A-Z|a-z|0-9|\:|\/|\.|\_]*')"
sudo bash -c "echo 'options(repos = list(CRAN=\"http://cran.rstudio.com/\"))' >> $rprofile"
Rscript -e 'update.packages(repos="http://cran.rstudio.com/", ask=FALSE, checkBuilt=TRUE)'

# Extra modules
conda install --force-reinstall -y cython cartopy matplotlib pandas geopandas koalas 'pyspark>=2.4' notebook -c conda-forge

# IPython/Jupyter
conda install -y ipykernel
python -m ipykernel install
python -m ipykernel install --user
# Markdown jupyter kernel
python -m pip install markdown-kernel
python -m markdown_kernel.install
# Python jupyter kernel
python -m pip install 'python-language-server[all]'
# R jupyter kernel
Rscript -e 'install.packages("languageserver")'
Rscript -e 'install.packages("IRkernel")'
Rscript -e 'IRkernel::installspec()'
Rscript -e 'install.packages("DBI")'
Rscript -e 'install.packages("RPostgreSQL")'
Rscript -e 'install.packages("ggmap")'
Rscript -e 'install.packages("lattice")'
Rscript -e 'install.packages("maptools")'
Rscript -e 'install.packages("maps")'
Rscript -e 'install.packages("mapdata")'
Rscript -e 'install.packages("marmap")'
Rscript -e 'install.packages("raster")'
# During install on OS X, Ctrl+Z, then: install_name_tool -add_rpath /usr/lib /usr/local/lib/R/3.6/site-library/00LOCK-sf/00new/sf/libs/sf.so && fg
Rscript -e 'install.packages("sf")'
# During install on OS X, Ctrl+Z, then: install_name_tool -add_rpath /usr/lib /usr/local/lib/R/3.6/site-library/00LOCK-png/00new/png/libs/png.so && fg
Rscript -e 'install.packages("sp")'
# During install on OS X, Ctrl+Z, then: install_name_tool -add_rpath /usr/lib /usr/local/lib/R/3.6/site-library/00LOCK-rgdal/00new/rgdal/libs/rgdal.so && fg
Rscript -e 'install.packages("rgdal")'
# During install on OS X, Ctrl+Z, then: install_name_tool -add_rpath /usr/lib /usr/local/lib/R/3.6/site-library/00LOCK-rgeos/00new/rgeos/libs/rgeos.so && fg
Rscript -e 'install.packages("rgeos")'
jupyter kernelspec list
