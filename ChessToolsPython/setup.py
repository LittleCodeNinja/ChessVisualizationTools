import cx_Freeze

executables = [cx_Freeze.Executable("boardsquarecolors.py")]

cx_Freeze.setup(
    name="Square Colors",
    options={"build_exe": {"packages": ["pygame"]}},
    executables=executables

    )
