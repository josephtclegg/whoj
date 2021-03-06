extern crate image;
extern crate num_complex;

fn main() {
    let k = 10.0f32;
    let ix = 500;
    let iy = 500;
    let scalex = 3.0 / ix as f32;
    let scaley = 3.0 / iy as f32;
    let imgbuf = image::ImageBuffer::new(ix, iy);

    for (x, y, pixel) in imgbuf.enumerate_pixels_mut() {
	let c1 = 255f32 * (f32::sin(k*x)+1f32)/2f32;
	let c2 = 255f32 * (f32::sin(k*y)+1f32)/2f32;
	let cc = c1 + c2;
	*pixel = image::Rgb([cc, cc, cc]);
    }

    imgbuf.save("sinnoise.png").unwrap();
}
