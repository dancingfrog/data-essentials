unset PYTHONPATH
PROJDIR=$CONDA_PREFIX
PROJ_CPPFLAGS="-I$PROJDIR/include -DACCEPT_USE_OF_DEPRECATED_PROJ_API_H=1"
PROJ_LDFLAGS="-L$PROJDIR/lib"

cp -r ./.R ~/

conda update -y -c defaults conda

conda install --force-reinstall -y conda conda-build
#conda install -f -y -q -n py37 -c conda-forge --file requirements.txt

# Install NodeJS & NPM
conda install -y -c conda-forge nodejs


# Install Python modules
conda install --force-reinstall -y awscli boto3 dvc dvc[s3] cython cartopy flask matplotlib pandas geopandas koalas 'pyspark>=2.4' notebook ptvsd -c conda-forge
pip install dvc --upgrade

# Install R
#conda update -y -c rdonnellyr -c main --all
#conda install --force-reinstall -y -c rdonnellyr r-base
#conda install --force-reinstall -c rdonnellyr -y _r-mutex r-assertthat r-base64enc r-bh r-bitops r-boot r-car r-caret r-catools r-chron r-class r-cluster r-codetools r-colorspace r-crayon r-curl r-data.table r-dbi r-dichromat r-digest r-doparallel r-dplyr r-essentials r-evaluate r-foreach r-foreign r-formatr r-ggplot2 r-ggplot2movies r-gistr r-glmnet r-gridbase r-gtable r-hexbin r-highr r-htmltools r-htmlwidgets r-httpuv r-httr r-igraph r-irdisplay r-irkernel r-irlba r-iterators r-jsonlite r-kernsmooth r-knitr r-labeling r-lattice r-lazyeval r-lme4 r-magrittr r-maps r-markdown r-mass r-matrix r-matrixmodels r-memoise r-mgcv r-mime r-minqa r-munsell r-nlme r-nloptr r-nmf r-nnet r-openssl r-pbdzmq r-pbkrtest r-pkgmaker r-plyr r-pryr r-quantmod r-quantreg r-r6 r-randomforest r-rbokeh r-rcolorbrewer r-rcpp r-rcppeigen r-recommended r-registry r-repr r-reshape2 r-rmarkdown r-rngtools r-rpart r-reticulate r-scales r-shiny r-shinydashboard r-sparsem r-spatial r-stringi r-stringr r-survival r-tibble r-tidyr r-ttr r-uuid r-xtable r-xts r-yaml r-zoo
# Update R profile
export rprofile="$(echo $(R  -f example.r  | grep '/Rprofile') | grep -o '[A-Z|a-z|\/][A-Z|a-z|0-9|\:|\/|\.|\_]*')"
echo $rprofile
echo $(for rp in $rprofile; do echo 'options(repos = list(CRAN="http://cran.rstudio.com/"))' >> $rp; done;) || sudo echo $(for rp in $rprofile; do echo 'options(repos = list(CRAN="http://cran.rstudio.com/"))' >> $rp; done;)
Rscript -e 'update.packages(repos="http://cran.rstudio.com/", ask=FALSE, checkBuilt=TRUE)'
sleep 10
# Install R packages
Rscript -e 'install.packages("DBI")'
# During install on OS X, Ctrl+Z, then (either): install_name_tool -add_rpath /usr/lib /usr/local/lib/R/3.6/site-library/00LOCK-sf/00new/RPostgreSQL/libs/RPostgreSQL.so && fg
# (... or): install_name_tool -add_rpath /usr/lib /Library/Frameworks/R.framework/Versions/3.5.1-MRO/Resources/library/RPostgreSQL/libs/RPostgreSQL.so && fg
Rscript -e 'install.packages("RPostgreSQL")'
Rscript -e 'install.packages("ggmap")'
Rscript -e 'install.packages("lattice")'
Rscript -e 'install.packages("maptools")'
Rscript -e 'install.packages("maps")'
Rscript -e 'install.packages("mapdata")'
Rscript -e 'install.packages("marmap")'
Rscript -e 'install.packages("raster")'
Rscript -e 'install.packages("reticulate")'
# During install on OS X, Ctrl+Z, then (either/or... see above): install_name_tool -add_rpath /usr/lib /Library/Frameworks/R.framework/Versions/3.5.1-MRO/Resources/library/sf/libs/sf.so && fg
Rscript -e 'install.packages("sf")'
# During install on OS X, Ctrl+Z, then (either/or... see above): install_name_tool -add_rpath /usr/lib /Library/Frameworks/R.framework/Versions/3.5.1-MRO/Resources/library/png/libs/png.so && fg
Rscript -e 'install.packages("sp")'
# During install on OS X, Ctrl+Z, then (either/or... see above): install_name_tool -add_rpath /usr/lib /Library/Frameworks/R.framework/Versions/3.5.1-MRO/Resources/library/rgdal/libs/rgdal.so && fg
Rscript -e 'install.packages("rgdal")'
# During install on OS X, Ctrl+Z, then (either/or... see above): install_name_tool -add_rpath /usr/lib /Library/Frameworks/R.framework/Versions/3.5.1-MRO/Resources/library/rgeos/libs/rgeos.so && fg
Rscript -e 'install.packages("rgeos")'

# IPython/Jupyter
conda install -y ipykernel
#python -m ipykernel install
#python -m ipykernel install --user
# Python jupyter kernel
conda install -y -c conda-forge python-language-server
#python -m pip install 'python-language-server[all]'
# Markdown jupyter kernel
python -m pip install markdown-kernel
python -m markdown_kernel.install
# NodeJS Kernel
npm install -g ijavascript
# R jupyter kernel
Rscript -e 'install.packages("languageserver")'
Rscript -e 'install.packages("IRkernel")'
Rscript -e 'IRkernel::installspec()'
jupyter kernelspec list
