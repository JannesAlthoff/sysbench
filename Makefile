SYSBENCH?=sysbench


.PHONY: sysbench
sysbench: sysbench.log


.PHONY: sysbench.log  # always rebuild
sysbench.log:
	@$(SYSBENCH) --version  # Fail early if sysbench is not installed
	@$(MAKE) .sysbench-run 2>&1 | tee --append $@


.PHONY: .sysbench-run
.sysbench-run:
	@date
	-lscpu || cat /proc/cpuinfo
	-free -h || free -m
	-lspci -nn
	-lsusb
	$(SYSBENCH) --threads=4 --cpu-max-prime=10000 cpu run
	$(SYSBENCH) --threads=4 --cpu-max-prime=20000 cpu run
	$(SYSBENCH) --threads=4 memory run


build: venv
	$(VENV)/python build.py


clean:
	git clean -dix


include Makefile.venv
Makefile.venv:
	curl \
		-o Makefile.fetched \
		-L "https://github.com/sio/Makefile.venv/raw/v2020.08.14/Makefile.venv"
	echo "5afbcf51a82f629cd65ff23185acde90ebe4dec889ef80bbdc12562fbd0b2611 *Makefile.fetched" \
		| sha256sum --check - \
		&& mv Makefile.fetched Makefile.venv
