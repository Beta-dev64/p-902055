import { FuseLabsLogo } from "@/components/FuseLabsLogo";
import { Reveal } from "@/components/motion";

const MadeByHumans = () => {
	return (
		<section id="made-by-humans" className="w-full bg-background py-0">
			<Reveal className="section-container pb-2">
				<div className="relative mt-6 w-full overflow-hidden rounded-2xl sm:mt-8 sm:rounded-3xl">
					<div
						className="flex min-h-[250px] flex-col justify-between bg-cover bg-center bg-no-repeat p-4 sm:min-h-[350px] sm:p-5"
						style={{
							backgroundImage: "url('/background-section3.png')",
						}}
					>
						<div className="flex items-center text-white">
							<FuseLabsLogo variant="onAccent" markClassName="h-10 w-10 sm:h-12 sm:w-12" />
						</div>

						<div className="flex flex-1 items-center justify-center py-8 sm:py-12">
							<h2 className="px-4 text-center font-academy text-3xl font-light italic text-white sm:text-5xl md:text-6xl lg:text-7xl">
								Made for Visionaries
							</h2>
						</div>

						{/* White box at the bottom with overflow */}
						<div className="absolute bottom-0 left-[-10%] h-10 w-[120%] rounded-t-lg bg-background">
							<p className="mt-2 text-center text-sm italic text-foreground">
								.....you dream it, we execute it.....
							</p>
						</div>
					</div>
				</div>
			</Reveal>
		</section>
	);
};
export default MadeByHumans;
