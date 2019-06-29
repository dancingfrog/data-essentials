# conda install -f -y -q -n py37 -c conda-forge --file requirements.txt

# IPython/Jupyter
conda install -y ipykernel
python -m ipykernel install
python -m ipykernel install --user
# Markdown jupyter kernel
python -m pip install markdown-kernel
python -m markdown_kernel.install
# Python jupyter kernel
python -m pip install 'python-language-server[all]'
conda install -y r-essentials r-igraph
rprofile="$(echo $(r  -f example.r  | grep '/Rprofile') | grep -o '[A-Z|a-z|\/][A-Z|a-z|0-9|\:|\/|\.]*')"
echo 'options(repos = list(CRAN="http://cran.rstudio.com/"))' >> $rprofile
# R jupyter kernel
Rscript -e 'install.packages("languageserver")'
Rscript -e 'IRkernel::installspec()'
# Extra modules
conda install -y matplotlib pandas geopandas koalas 'pyspark>=2.4' -c conda-forge
conda install -y xeus xeus-python notebook -c conda-forge
jupyter kernelspec list
