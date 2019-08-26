# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/Users/jo088ha/miniconda3/bin/conda' 'shell.bash' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/Users/jo088ha/miniconda3/etc/profile.d/conda.sh" ]; then
        . "/Users/jo088ha/miniconda3/etc/profile.d/conda.sh"
    else
        export PATH="/Users/jo088ha/miniconda3/bin:$PATH"
    fi
fi
# <<< conda initialize <<<

conda activate data.essentials;
apm install hydrogen hydrogen-launcher;
apm install atom-ide-ui atom-language-r ide-python ide-r;
atom --new-instance -a
