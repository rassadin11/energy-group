import browserSync from 'browser-sync';
import fileInclude from "gulp-file-include";
import typograf from "gulp-typograf";
import replace from "gulp-replace";

export const htmlInclude = () => {
  return app.gulp.src([`${app.paths.base.src}/*.html`])
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file',
      maxRecursion: 100
    }))

    .pipe(replace(
      /<!-- typograf:ignore:start -->[\s\S]*?<!-- typograf:ignore:end -->/g,
      match => `__TYPOGRAF_IGNORE__${Buffer.from(match).toString('base64')}__END__`
    ))
    .pipe(typograf({
      locale: ['ru', 'en-US'],
    }))
    .pipe(replace(
      /__TYPOGRAF_IGNORE__([\s\S]*?)__END__/g,
      (_, encoded) => Buffer.from(encoded, 'base64').toString()
    ))
    .pipe(app.gulp.dest(app.paths.base.build))
    .pipe(browserSync.stream());
}
