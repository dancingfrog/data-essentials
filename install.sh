source activate data_essentials

# conda install -f -y -q -n py37 -c conda-forge --file requirements.txt

conda install -y ipykernel
python -m ipykernel install
python -m ipykernel install --user
python -m pip install 'python-language-server[all]'
python -m pip install markdown-kernel
python -m markdown_kernel.install
conda install -y matplotlib pandas geopandas koalas 'pyspark>=2.4' -c conda-forge
conda install -y xeus xeus-python notebook -c conda-forge
jupyter kernelspec list
